import { FluxResultObserver, FluxTableMetaData, ParameterizedQuery, QueryOptions } from '@influxdata/influxdb-client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InfluxDbService, QueryData } from '../influx-db/influx-db.service';
import { SensorConfigurationDto } from '../sensors/dto/sensor.dto';
import { CreateBedDto } from './dto/create-bed.dto';
import { UpdateBedDto } from './dto/update-bed.dto';
import { BedEntity } from './entities/bed.entity';

@Injectable()
export class BedsService {
  constructor(
    @InjectRepository(BedEntity)
    private readonly bedRepository: Repository<BedEntity>,
    private readonly inflxuService: InfluxDbService,
  ) {}

  create(createBedDto: CreateBedDto) {
    return this.bedRepository.save(createBedDto);
  }

  async findAll() {
    const found = this.bedRepository.find({ relations: { boards: true } });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  findOne(id: string) {
    return this.bedRepository.findOne({
      where: { id },
      relations: { boards: true },
    });
  }

  async update(id: string, updateBedDto: UpdateBedDto) {
    const found = await this.bedRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException();
    }
    await this.bedRepository.save({ ...found, ...updateBedDto });
    return this.findOne(id);
  }

  remove(id: string) {
    this.bedRepository.delete(id);
  }

  async getSensorData(bedId: string, from: Date, to: Date) {
    // Query influx for active sensors on this bed
    const bed = await this.bedRepository.findOne({
      where: { id: bedId },
      relations: ['boards', 'boards.sensors', 'boards.sensors.sensor'],
    });

    if (!bed) {
      throw new NotFoundException();
    }

    // Get all sensor ids 
    const boardIds = bed.boards.map(board => board.id);
    const sensorMap = new Map<string, SensorConfigurationDto>();
    bed.boards.forEach(board => {
      board.sensors.forEach(sensor => {
        sensorMap.set(sensor.id, sensor.sensor);
      });
    });

    // Calculate aggrate window in seconds to have 50 data points
    const window = Math.round((to.getTime() - from.getTime()) / 1000 / 50);

    // Query influx for data for each sensor
    const sensorData = await Promise.all(boardIds.map(async boardId => {
      const data = await this._query<{"_time": string, "_value": number, topic: string}>(
        'ontop.hs-bochum.de',
        `
        import "strings"
        from(bucket: "initial")
          |> range(start: ${from.toISOString()}, stop: ${to.toISOString()})
          |> filter(fn: (r) => r["_measurement"] == "sensor_data")
          |> filter(fn: (r) => strings.containsStr(substr: "boards/${boardId}", v: r.topic))
          |> aggregateWindow(every: ${window}s, fn: mean, createEmpty: false)
          |> yield(name: "median")
        `
        ) as unknown as { value?: { _time: Date, _value: number, topic: string }[] };

        const groupedData: {
          values: { _time: Date; _value: number }[];
          sensor: SensorConfigurationDto;
          board_sensor_id: string;
        }[] = [];

        // Group by sensor id
        // Topic is in format boards/<boardId>/sensors/<sensorId>/data;
        data.value?.forEach(row => {
          const topic = row.topic.split('/');
          const sensorId = topic[topic.length - 2];
          const sensor = sensorMap.get(sensorId);
          if (!sensor) return;
          const existing = groupedData.find(d => d.sensor.id === sensor.id);
          if (existing) {
            existing.values.push({ _time: row._time, _value: row._value });
          }
          else {
            groupedData.push({ values: [{ _time: row._time, _value: row._value }], sensor, board_sensor_id: sensorId });
          }
        });


        return { boardId, data: groupedData };
      })
    );

    // console.log(sensorData);
    return sensorData;
  }

  private _query<RowType>(
    org: string | QueryOptions,
    query: string | ParameterizedQuery
  ): Promise<QueryData<RowType>> {
    return new Promise((resolve, reject) => {
      const data: QueryData<RowType> = {} as QueryData<RowType>;
      const observer: FluxResultObserver<string[]> = {
        next: (row: string[], tableMeta: FluxTableMetaData) => {
          const field = tableMeta.get(row, '_field');
          const value = tableMeta.get(row, '_value');
          const topic = tableMeta.get(row, 'topic');
          const time = tableMeta.get(row, '_time');
          const date = new Date(time);

          if (!data[field]) data[field] = [];
          data[field].push({
            _time: date,
            _value: value,
            topic
          });
        },
        error: (error) => {
          reject(error);
        },
        complete: () => {
          resolve(data);
        },
      };

      this.inflxuService.influx.getQueryApi(org).queryRows(query, observer);
    });
  }
}
