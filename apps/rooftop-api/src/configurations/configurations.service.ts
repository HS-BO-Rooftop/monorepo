import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, Repository } from 'typeorm';
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
}
