import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
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
    ClientsModule.registerAsync([
      {
        name: 'SENSOR_MQTT',
        useFactory: (config: ConfigService) => ({
          transport: Transport.MQTT,
          options: {
            url: config.get('MQTT_URL'),
            username: config.get('MQTT_USERNAME'),
            password: config.get('MQTT_PASSWORD'),
          },
        }),
        inject: [ConfigService],
        imports: [ConfigModule],
      },
    ]),
  ],
  exports: [SensorsService],
})
export class SensorsModule {}
