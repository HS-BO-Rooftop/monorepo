import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardSensorDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { BoardSensorEntity } from './entities/configuration.entity';

@Injectable()
export class ConfigurationsService {
  constructor(
    @InjectRepository(BoardSensorEntity)
    private readonly repo: Repository<BoardSensorEntity>
  ) {}

  async create(createConfigurationDto: CreateBoardSensorDto) {
    const created = await this.repo.save(createConfigurationDto);
    return this.findOne(created.id);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({
      where: {
        id,
      },
      relations: {
        sensor: true,
        board: true,
        boardPin: true,
      },
    });

    if (!entity) {
      throw new NotFoundException(`Configuration with id ${id} not found`);
    }
    return entity;
  }

  async update(id: string, updateConfigurationDto: UpdateConfigurationDto) {
    const existing = await this.findOne(id);
    const updated = await this.repo.save({
      id: existing.id,
      ...updateConfigurationDto,
    });

    return updated;
  }

  async remove(id: string) {
    const existing = await this.findOne(id);
    return this.repo.remove(existing);
  }

  async findAllByBoard(deviceId: string) {
    const configurations = await this.repo.find({
      where: {
        deviceId,
      },
      relations: {
        sensor: true,
        board: true,
        boardPin: true,
      },
    });

    return configurations;
  }
}
