import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CannotCreateEntityIdMapError,
  QueryFailedError,
  Repository,
} from 'typeorm';
import { SensorTypeEntity } from './entities/sensor-type.entity';
import { CreateSensorTypeDto } from './dto/create-sensor-type.dto';
import { UpdateSensorTypeDto } from './dto/update-sensor-type.dto';

@Injectable()
export class SensorTypesService {
  constructor(
    @InjectRepository(SensorTypeEntity)
    private readonly repo: Repository<SensorTypeEntity>
  ) {}

  async create(createSensorTypeDto: CreateSensorTypeDto) {
    return await this.repo.save(createSensorTypeDto);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const entry = await this.repo.findOne({
      where: {
        id,
      },
    });

    if (!entry) {
      throw new NotFoundException(`SensorType with id ${id} not found`);
    }

    return entry;
  }

  async update(id: string, updateSensorTypeDto: UpdateSensorTypeDto) {
    const entry = await this.findOne(id);

    const result = await this.repo.save({
      ...entry,
      name: updateSensorTypeDto.name,
    });

    return result;
  }

  async remove(id: string) {
    const entry = await this.findOne(id);

    await this.repo.remove(entry);
  }
}
