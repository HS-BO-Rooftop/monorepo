import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { InfluxDbModule } from '../influx-db/influx-db.module';
import { WeatherServiceWorker } from './weather.service-worker';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
  imports: [HttpModule, InfluxDbModule],
  providers: [WeatherServiceWorker, WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}
