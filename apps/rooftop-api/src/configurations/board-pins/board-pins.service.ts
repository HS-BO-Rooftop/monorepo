import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardConfigurationUpdatedEvent } from '../../common/events/board-configuration-updated.event';
import { CreateBoardPinDto } from './dto/create-board-pin.dto';
import { UpdateBoardPinDto } from './dto/update-board-pin.dto';
import { BoardPinEntity } from './entities/board-pin.entity';

@Injectable()
export class BoardPinsService {
  constructor(
    @InjectRepository(BoardPinEntity)
    private readonly repo: Repository<BoardPinEntity>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  create(createBoardPinDto: CreateBoardPinDto) {
    return this.repo.save(createBoardPinDto);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`BoardPin with ID "${id}" does not exist!`);
    }

    return existing;
  }

  async update(id: string, updateBoardPinDto: UpdateBoardPinDto) {
    const existing = await this.findOne(id);

    const updated = await this.repo.save({
      id: existing.id,
      pin: updateBoardPinDto.pin,
    });

    const postUpdate = await this.repo.findOne({
      where: {
        id: existing.id,
      },
      relations: {
        sensors: true,
      },
    });

    this.sendConfigurationChangedEvent(postUpdate);

    return updated;
  }

  private sendConfigurationChangedEvent(affectedEntity: BoardPinEntity) {
    const affectedDeviceIds = affectedEntity.sensors.map(
      (sensor) => sensor.deviceId
    );

    affectedDeviceIds.forEach((deviceId) => {
      this.eventEmitter.emit(
        BoardConfigurationUpdatedEvent.eventName,
        new BoardConfigurationUpdatedEvent(deviceId)
      );
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    const eventEntity = await this.repo.findOne({
      where: { id },
      relations: {
        sensors: true,
      },
    });

    await this.repo.delete(id);

    this.sendConfigurationChangedEvent(eventEntity);
  }
}
