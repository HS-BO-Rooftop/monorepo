import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSensorInterfaceDto } from './dto/create-sensor-interface.dto';
import { UpdateSensorInterfaceDto } from './dto/update-sensor-interface.dto';
import { SensorInterfaceEntity } from './entities/sensor-interface.entity';

@Injectable()
export class SensorInterfacesService {
  constructor(
    @InjectRepository(SensorInterfaceEntity)
    private readonly repo: Repository<SensorInterfaceEntity>
  ) {}

  create(createSensorInterfaceDto: CreateSensorInterfaceDto) {
    return this.repo.save({
      name: createSensorInterfaceDto.name,
    });
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(`SensorInterface with id ${id} not found`);
    }

    return entity;
  }

  async update(id: string, updateSensorInterfaceDto: UpdateSensorInterfaceDto) {
    const entity = await this.findOne(id);

    return this.repo.save({
      ...entity,
      name: updateSensorInterfaceDto.name,
    });
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}
