import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorConfigurationEntity } from './entities/sensor.entity';
import { SensorInterfacesModule } from './sensor-interfaces/sensor-interfaces.module';
import { SensorMqttController } from './sensor-mqtt/sensor-mqtt.controller';
import { SensorTypesModule } from './sensor-types/sensor-types.module';
import { SensorsController } from './sensors.controller';
import { SensorsService } from './sensors.service';

@Module({
  controllers: [SensorsController, SensorMqttController],
  providers: [SensorsService],
  imports: [
    TypeOrmModule.forFeature([SensorConfigurationEntity]),
    SensorTypesModule,
    SensorInterfacesModule,
  ],
  exports: [SensorsService],
})
export class SensorsModule {}
