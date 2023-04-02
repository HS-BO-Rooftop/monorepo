import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { InfluxDbModule } from '../influx-db/influx-db.module';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherServiceWorker } from './weather.service-worker';

@Module({
  imports: [HttpModule, InfluxDbModule],
  providers: [WeatherServiceWorker, WeatherService],
  controllers: [WeatherController],
  exports: [WeatherService]
})
export class WeatherModule {}
