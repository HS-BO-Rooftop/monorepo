import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardConfigurationUpdatedEvent } from '../../common/events/board-configuration-updated.event';
import { CreateSensorInterfaceDto } from './dto/create-sensor-interface.dto';
import { UpdateSensorInterfaceDto } from './dto/update-sensor-interface.dto';
import { SensorInterfaceEntity } from './entities/sensor-interface.entity';

@Injectable()
export class SensorInterfacesService {
  constructor(
    @InjectRepository(SensorInterfaceEntity)
    private readonly repo: Repository<SensorInterfaceEntity>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  create(createSensorInterfaceDto: CreateSensorInterfaceDto) {
    return this.repo.save({
      name: createSensorInterfaceDto.name,
    });
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(`SensorInterface with id ${id} not found`);
    }

    return entity;
  }

  async update(id: string, updateSensorInterfaceDto: UpdateSensorInterfaceDto) {
    const entity = await this.findOne(id);

    const updated = this.repo.save({
      ...entity,
      name: updateSensorInterfaceDto.name,
    });

    const updatedInterface = await this.repo.findOne({
      where: {
        id: entity.id,
      },
      relations: {
        sensors: {
          boardSensors: true,
        },
      },
    });

    this.sendConfigurationChangedEvent(updatedInterface);

    return updated;
  }

  async remove(id: string) {
    const entity = await this.repo.findOne({
      where: { id },
      relations: {
        sensors: {
          boardSensors: true,
        },
      },
    });

    await this.repo.remove(entity);

    this.sendConfigurationChangedEvent(entity);
  }

  private sendConfigurationChangedEvent(
    updatedInterface: SensorInterfaceEntity
  ) {
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
