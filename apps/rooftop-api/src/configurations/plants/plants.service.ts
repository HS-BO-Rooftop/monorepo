import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { PlantEntity } from './entities/plant.entity';

@Injectable()
export class PlantsService {
  constructor(
    @InjectRepository(PlantEntity)
    private readonly plantsRepository: Repository<PlantEntity>
  ) {}

  create(createPlantDto: CreatePlantDto) {
    return this.plantsRepository.save(createPlantDto);
  }

  findAll() {
    return this.plantsRepository.find({
      relations: {
        boards: true,
      },
    });
  }

  async findOne(id: string) {
    const plant = await this.plantsRepository.findOne({
      where: { id },
      relations: { boards: true },
    });
    if (!plant) {
      throw new NotFoundException(`Plant ${id} not found`);
    }
    return plant;
  }

  async update(id: string, updatePlantDto: UpdatePlantDto) {
    const res = await this.plantsRepository.update(id, updatePlantDto);
    if (res.affected === 0) {
      throw new NotFoundException(`Plant ${id} not found`);
    }
    return this.findOne(id);
  }

  remove(id: string) {
    this.plantsRepository.delete(id);
  }
}
