import { Module } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SensorsController } from './sensors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorConfigurationEntity } from './entities/sensor.entity';
import { SensorInterfaceEntity } from './sensor-interfaces/entities/sensor-interface.entity';
import { SensorTypeEntity } from './sensor-types/entities/sensor-type.entity';
import { SensorTypesModule } from './sensor-types/sensor-types.module';
import { SensorInterfacesModule } from './sensor-interfaces/sensor-interfaces.module';

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
    SensorInterfacesModule,
  ],
})
export class SensorsModule {}
