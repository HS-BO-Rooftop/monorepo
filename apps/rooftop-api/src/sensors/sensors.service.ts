import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSensorConfigurationDto } from './dto/create-sensor-configuration.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { SensorConfigurationEntity } from './entities/sensor.entity';
import { SensorInterfacesService } from './sensor-interfaces/sensor-interfaces.service';

@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(SensorConfigurationEntity)
    private readonly repo: Repository<SensorConfigurationEntity>,
    private readonly interfaceService: SensorInterfacesService
  ) {}

  async create(createSensorDto: CreateSensorConfigurationDto) {
    const foundInterface = await this.interfaceService.findOne(
      createSensorDto.sensorInterfaceId
    );
    // Check if the interface is of type i2c
    this.verifyI2CAddress(foundInterface.name, createSensorDto.i2cAddress);

    const created = await this.repo.save(createSensorDto);

    return this.findOne(created.id);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      throw new BadRequestException(
        `Sensor configuration with id ${id} not found`
      );
    }

    return entity;
  }

  async update(id: string, updateSensorDto: UpdateSensorDto) {
    const existing = await this.findOne(id);

    // If the interface changes to i2c, verify that the i2c address is valid
    if (
      updateSensorDto.sensorInterfaceId &&
      existing.sensorInterfaceId !== updateSensorDto.sensorInterfaceId
    ) {
      const newInterface = await this.interfaceService.findOne(
        updateSensorDto.sensorInterfaceId
      );
      this.verifyI2CAddress(newInterface.name, updateSensorDto.i2cAddress);
    }

    await this.repo.save({
      id: existing.id,
      ...updateSensorDto,
    });

    return this.findOne(id);
  }

  async remove(id: string) {
    const existing = await this.findOne(id);
    return this.repo.remove(existing);
  }

  private verifyI2CAddress(interfaceName: string, i2cAddress?: number) {
    if (!i2cAddress) {
      throw new BadRequestException(
        'I2C address is required for i2c interfaces'
      );
    }

    if (interfaceName.toLowerCase() === 'i2c') {
      // Validate that the i2c address is valid
      if (i2cAddress < 0 || i2cAddress > 127) {
        throw new BadRequestException('The i2c address is invalid');
      }
    }
  }
}
