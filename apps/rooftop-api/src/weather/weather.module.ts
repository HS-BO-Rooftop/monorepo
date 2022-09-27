import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { InfluxDbModule } from '../influx-db/influx-db.module';
import { WeatherServiceWorker } from './weather.service-worker';

@Module({
  imports: [HttpModule, InfluxDbModule],
  providers: [WeatherServiceWorker],
})
export class WeatherModule {}
