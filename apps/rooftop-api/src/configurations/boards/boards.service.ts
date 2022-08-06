import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardEntity } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly repo: Repository<BoardEntity>
  ) {}

  create(createBoardDto: CreateBoardDto) {
    return this.repo.save(createBoardDto);
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

    return this.repo.save({
      id: existing.id,
      name: updateBoardDto.name,
    });
  }

  async remove(id: string) {
    const existing = await this.findOne(id);
    return this.repo.remove(existing);
  }
}
