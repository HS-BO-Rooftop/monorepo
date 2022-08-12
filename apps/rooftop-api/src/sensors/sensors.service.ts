import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardConfigurationUpdatedEvent } from '../common/events/board-configuration-updated.event';
import { CreateSensorConfigurationDto } from './dto/create-sensor-configuration.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { SensorConfigurationEntity } from './entities/sensor.entity';
import { SensorInterfacesService } from './sensor-interfaces/sensor-interfaces.service';

@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(SensorConfigurationEntity)
    private readonly repo: Repository<SensorConfigurationEntity>,
    private readonly interfaceService: SensorInterfacesService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async create(createSensorDto: CreateSensorConfigurationDto) {
    const foundInterface = await this.interfaceService.findOne(
      createSensorDto.sensorInterfaceId
    );
    // Check if the interface is of type i2c
    this.verifyI2CAddress(foundInterface.name, createSensorDto.i2cAddress);

    const created = await this.repo.save(createSensorDto);

    this.eventEmitter.emit(
      BoardConfigurationUpdatedEvent.eventName,
      new BoardConfigurationUpdatedEvent(created.id)
    );

    return this.findOne(created.id);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      throw new BadRequestException(
        `Sensor configuration with id ${id} not found`
      );
    }

    return entity;
  }

  async update(id: string, updateSensorDto: UpdateSensorDto) {
    const existing = await this.findOne(id);

    // If the interface changes to i2c, verify that the i2c address is valid
    if (
      updateSensorDto.sensorInterfaceId &&
      existing.sensorInterfaceId !== updateSensorDto.sensorInterfaceId
    ) {
      const newInterface = await this.interfaceService.findOne(
        updateSensorDto.sensorInterfaceId
      );
      this.verifyI2CAddress(newInterface.name, updateSensorDto.i2cAddress);
    }

    await this.repo.save({
      id: existing.id,
      ...updateSensorDto,
    });

    await this.sendBoardConfigurationChangedEvent(id);

    return this.findOne(id);
  }

  private async sendBoardConfigurationChangedEvent(id: string) {
    const boards = await this.repo.findOne({
      where: { id },
      relations: {
        boardSensors: true,
      },
    });

    const affectedBoards = new Set(
      boards.boardSensors.map((bs) => bs.deviceId)
    );

    // Emit an event for each affected board
    affectedBoards.forEach((boardId) => {
      this.eventEmitter.emit(
        BoardConfigurationUpdatedEvent.eventName,
        new BoardConfigurationUpdatedEvent(boardId)
      );
    });
  }

  async remove(id: string) {
    const existing = await this.findOne(id);

    const boardsQuery = await this.repo.findOne({
      where: { id },
      relations: {
        boardSensors: true,
      },
    });

    const affectedBoards = new Set(
      boardsQuery.boardSensors.map((bs) => bs.deviceId)
    );

    await this.repo.remove(existing);
    affectedBoards.forEach((boardId) => {
      this.eventEmitter.emit(
        BoardConfigurationUpdatedEvent.eventName,
        new BoardConfigurationUpdatedEvent(boardId)
      );
    });
  }

  private verifyI2CAddress(interfaceName: string, i2cAddress?: number) {
    if (!i2cAddress) {
      throw new BadRequestException(
        'I2C address is required for i2c interfaces'
      );
    }

    if (interfaceName.toLowerCase() === 'i2c') {
      // Validate that the i2c address is valid
      if (i2cAddress < 0 || i2cAddress > 127) {
        throw new BadRequestException('The i2c address is invalid');
      }
    }
  }
}
