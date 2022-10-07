import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBedDto } from './dto/create-bed.dto';
import { UpdateBedDto } from './dto/update-bed.dto';
import { BedEntity } from './entities/bed.entity';

@Injectable()
export class BedsService {
  constructor(
    @InjectRepository(BedEntity)
    private readonly bedRepository: Repository<BedEntity>
  ) {}

  create(createBedDto: CreateBedDto) {
    return this.bedRepository.save(createBedDto);
  }

  async findAll() {
    const found = this.bedRepository.find({ relations: { boards: true } });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  findOne(id: string) {
    return this.bedRepository.findOne({
      where: { id },
      relations: { boards: true },
    });
  }

  async update(id: string, updateBedDto: UpdateBedDto) {
    const found = await this.bedRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException();
    }
    await this.bedRepository.save({ ...found, ...updateBedDto });
    return this.findOne(id);
  }

  remove(id: string) {
    this.bedRepository.delete(id);
  }
}
