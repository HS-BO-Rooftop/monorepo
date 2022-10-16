import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, In, Repository } from 'typeorm';
import { BoardConfigurationUpdatedEvent } from '../common/events/board-configuration-updated.event';
import { BoardConfigurationDto } from './boards/dto/board-configuration.dto';
import { CreateBoardSensorDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { BoardSensorEntity } from './entities/configuration.entity';

@Injectable()
export class ConfigurationsService {
  private relations: FindOptionsRelations<BoardSensorEntity> = {
    sensor: true,
    board: true,
    boardPin: true,
  };

  constructor(
    @InjectRepository(BoardSensorEntity)
    private readonly repo: Repository<BoardSensorEntity>,
    private eventEmitter: EventEmitter2
  ) {}

  async create(createConfigurationDto: CreateBoardSensorDto) {
    const created = await this.repo.save(createConfigurationDto);

    this.eventEmitter.emit(
      BoardConfigurationUpdatedEvent.eventName,
      new BoardConfigurationUpdatedEvent(created.deviceId)
    );

    return this.findOne(created.id);
  }

  findAll() {
    return this.repo
      .find({
        relations: this.relations,
      })
      .then((configs) =>
        configs.map((config) => new BoardConfigurationDto(config))
      );
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({
      where: {
        id,
      },
      relations: this.relations,
    });

    if (!entity) {
      throw new NotFoundException(`Configuration with id ${id} not found`);
    }
    return new BoardConfigurationDto(entity);
  }

  async update(id: string, updateConfigurationDto: UpdateConfigurationDto) {
    const existing = await this.findOne(id);
    const updated = await this.repo.save({
      id: existing.id,
      ...updateConfigurationDto,
    });

    const postUpdate = await this.findOne(updated.id);

    this.eventEmitter.emit(
      BoardConfigurationUpdatedEvent.eventName,
      new BoardConfigurationUpdatedEvent(postUpdate.deviceId)
    );

    return this.findOne(updated.id);
  }

  async remove(id: string) {
    const existing = await this.findOne(id);
    await this.repo.delete(existing.id);

    this.eventEmitter.emit(
      BoardConfigurationUpdatedEvent.eventName,
      new BoardConfigurationUpdatedEvent(existing.deviceId)
    );
  }

  async findAllByBoard(deviceId: string) {
    const configurations = await this.repo.find({
      where: {
        deviceId,
      },
      relations: this.relations,
    });

    return configurations.map(
      (configuration) => new BoardConfigurationDto(configuration)
    );
  }

  /**
   * Finds all sensors by their ids, requires that all sensors exist
   * @param ids Sensor IDs to check
   * @returns Array of valid sensor IDs
   * @throws BadRequestException if any of the sensors are not found
   */
  async findAllSensors(
    ids: string[]
  ): Promise<BoardSensorEntity[] | undefined> {
    const sensors = await this.repo.find({
      where: {
        id: In(ids),
      },
      relations: {
        sensor: {
          sensorType: true,
        },
        board: {
          bed: true,
        },
      },
    });

    if (sensors.length !== ids.length) {
      // Return the sensors that are not valid
      const invalidIds = ids.filter((id) => !sensors.some((s) => s.id === id));
      throw new BadRequestException(
        `Invalid sensor ids: ${invalidIds.join(', ')}`
      );
    } else {
      return sensors;
    }
  }
}
