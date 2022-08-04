import { Injectable } from '@nestjs/common';
import { CreateSensorConfigurationDto } from './dto/create-sensor-configuration.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';

@Injectable()
export class SensorsService {
  create(createSensorDto: CreateSensorConfigurationDto) {
    return 'This action adds a new sensor';
  }

  findAll() {
    return `This action returns all sensors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sensor`;
  }

  update(id: number, updateSensorDto: UpdateSensorDto) {
    return `This action updates a #${id} sensor`;
  }

  remove(id: number) {
    return `This action removes a #${id} sensor`;
  }
}
