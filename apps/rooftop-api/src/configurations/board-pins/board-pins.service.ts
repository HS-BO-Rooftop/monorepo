import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardPinDto } from './dto/create-board-pin.dto';
import { UpdateBoardPinDto } from './dto/update-board-pin.dto';
import { BoardPinEntity } from './entities/board-pin.entity';

@Injectable()
export class BoardPinsService {
  constructor(
    @InjectRepository(BoardPinEntity)
    private readonly repo: Repository<BoardPinEntity>
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

    return this.repo.save({
      id: existing.id,
      pin: updateBoardPinDto.pin,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
