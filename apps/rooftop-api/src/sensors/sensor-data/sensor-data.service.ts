import { Point } from '@influxdata/influxdb-client';
import { Injectable } from '@nestjs/common';
import { ConfigurationsService } from '../../configurations/configurations.service';
import { BoardSensorEntity } from '../../configurations/entities/configuration.entity';
import { InfluxDbService } from '../../influx-db/influx-db.service';
import {
  CreateSensorDataEntry,
  CreateSensorDataRequestDto,
} from './dto/create';

@Injectable()
export class SensorDataService {
  constructor(
    private readonly influxDb: InfluxDbService,
    private readonly boardSensors: ConfigurationsService
  ) {}

  async create(data: CreateSensorDataRequestDto) {
    console.log('Data', data);
    const dataMap = new Map<string, CreateSensorDataEntry[]>();
    Object.entries(data).forEach(([key, value]) => {
      dataMap.set(key, value);
    });

    // Check that all sensor configurations are valid
    const sensorIds = Array.from(dataMap.keys());
    const sensorConfigurations = await this.boardSensors.findAllSensors(
      sensorIds
    );

    const sensorConfigurationMap = new Map<string, BoardSensorEntity>();
    sensorConfigurations.forEach((sensor) => {
      sensorConfigurationMap.set(sensor.id, sensor);
    });

    // Write data to influx
    const allPoints: Point[] = [];
    dataMap.forEach((values, sensorId) => {
      const sensorConfig = sensorConfigurationMap.get(sensorId);
      if (!sensorConfig) {
        throw new Error(`Sensor configuration with id ${sensorId} not found`);
      }
      const points = values.map((value) => {
        const point = new Point('sensor_data');
        point.tag('sensor_id', sensorId);
        point.tag('sensor_type', sensorConfig.sensor.sensorType.name);
        point.tag('sensor_name', sensorConfig.sensor.name);
        point.tag('board_id', sensorConfig.board.id);
        point.tag('board_name', sensorConfig.board.name);
        point.tag('bed_id', sensorConfig.board.bed.id);
        point.tag('bed_name', sensorConfig.board.bed.name);

        if (typeof value.value === 'number') {
          point.floatField('value', value.value);
        }
        if (typeof value.value === 'boolean') {
          point.booleanField('value', value.value);
        }
        if (typeof value.value === 'string') {
          point.stringField('value', value.value);
        }
        point.timestamp(new Date(value.timestamp));
        return point;
      });
      allPoints.push(...points);
    });

    console.log('All points', allPoints);

    await this.influxDb.write('ontop.hs-bochum.de', 'initial', ...allPoints);
  }
}
