import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardConfigurationUpdatedEvent } from '../../common/events/board-configuration-updated.event';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardEntity } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly repo: Repository<BoardEntity>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const created = await this.repo.save(createBoardDto);
    this.eventEmitter.emit(
      BoardConfigurationUpdatedEvent.eventName,
      new BoardConfigurationUpdatedEvent(created.id)
    );
    return created;
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }
    return entity;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const existing = await this.findOne(id);

    const res = await this.repo.save({
      id: existing.id,
      name: updateBoardDto.name,
    });

    this.eventEmitter.emit(
      BoardConfigurationUpdatedEvent.eventName,
      new BoardConfigurationUpdatedEvent(res.id)
    );

    return res;
  }

  async remove(id: string) {
    const existing = await this.findOne(id);
    await this.repo.remove(existing);
    this.eventEmitter.emit(
      BoardConfigurationUpdatedEvent.eventName,
      new BoardConfigurationUpdatedEvent(id)
    );
  }
}
