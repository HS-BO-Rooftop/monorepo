import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutboundResponseSerializer } from '../common/mqtt/outboundResponseSerializer';
import { WeatherModule } from '../weather/weather.module';
import { AutomationsController } from './automations.controller';
import { AutomationsService } from './automations.service';
import { AutomationEntity } from './entities/automation.entity';
import { MQTTCacheService } from './mqtt-cache.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'SENSOR_MQTT',
        useFactory: (config: ConfigService) => {
          return {
          transport: Transport.MQTT,
          options: {
            url: config.get('MQTT_URL'),
            username: config.get('MQTT_USERNAME'),
            password: config.get('MQTT_PASSWORD'),
            serializer: new OutboundResponseSerializer(),
          },
        }},
        inject: [ConfigService],
        imports: [ConfigModule],
      },
    ]),
    WeatherModule,
    TypeOrmModule.forFeature([AutomationEntity])
  ],
  controllers: [AutomationsController],
  providers: [AutomationsService, MQTTCacheService],
})
export class AutomationsModule {}
