import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardConfigurationUpdatedEvent } from '../../common/events/board-configuration-updated.event';
import { CreateSensorTypeDto } from './dto/create-sensor-type.dto';
import { UpdateSensorTypeDto } from './dto/update-sensor-type.dto';
import { SensorTypeEntity } from './entities/sensor-type.entity';

@Injectable()
export class SensorTypesService {
  constructor(
    @InjectRepository(SensorTypeEntity)
    private readonly repo: Repository<SensorTypeEntity>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async create(createSensorTypeDto: CreateSensorTypeDto) {
    return await this.repo.save(createSensorTypeDto);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const entry = await this.repo.findOne({
      where: {
        id,
      },
    });

    if (!entry) {
      throw new NotFoundException(`SensorType with id ${id} not found`);
    }

    return entry;
  }

  async update(id: string, updateSensorTypeDto: UpdateSensorTypeDto) {
    const entry = await this.findOne(id);

    const result = await this.repo.save({
      ...entry,
      name: updateSensorTypeDto.name,
    });

    const updated = await this.repo.findOne({
      where: {
        id: entry.id,
      },
      relations: {
        sensors: {
          boardSensors: true,
        },
      },
    });

    this.sendConfigurationChangedEvent(updated);

    return result;
  }

  async remove(id: string) {
    const entry = await this.findOne(id);

    const eventEntity = await this.repo.findOne({
      where: {
        id: entry.id,
      },
      relations: {
        sensors: {
          boardSensors: true,
        },
      },
    });

    await this.repo.remove(entry);

    this.sendConfigurationChangedEvent(eventEntity);
  }

  private sendConfigurationChangedEvent(updatedInterface: SensorTypeEntity) {
    const deviceIds = updatedInterface.sensors.reduce((acc, sensorConfig) => {
      const boards = sensorConfig.boardSensors.map(
        (boardSensor) => boardSensor.deviceId
      );
      return [...acc, ...boards];
    }, [] as string[]);

    deviceIds.forEach((deviceId) => {
      this.eventEmitter.emit(
        BoardConfigurationUpdatedEvent.eventName,
        new BoardConfigurationUpdatedEvent(deviceId)
      );
    });
  }
}
