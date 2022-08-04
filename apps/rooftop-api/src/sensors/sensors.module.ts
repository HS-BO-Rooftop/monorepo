import { Module } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SensorsController } from './sensors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorConfigurationEntity } from './entities/sensor.entity';
import { SensorInterfaceEntity } from './entities/sensor-interface.entity';
import { SensorTypeEntity } from './entities/sensor-type.entity';
import { SensorTypesModule } from './sensor-types/sensor-types.module';

@Module({
  controllers: [SensorsController],
  providers: [SensorsService],
  imports: [
    TypeOrmModule.forFeature([
      SensorConfigurationEntity,
      SensorTypeEntity,
      SensorInterfaceEntity,
    ]),
    SensorTypesModule,
  ],
})
export class SensorsModule {}
