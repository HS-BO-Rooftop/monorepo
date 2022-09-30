import { Point } from '@influxdata/influxdb-client';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron } from '@nestjs/schedule';
import { plainToInstance } from 'class-transformer';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { InfluxDbService } from '../influx-db/influx-db.service';
import { CurrentWeatherResponseDto } from './dto/dwd/current-weather-response.dto';

const LAT = 51.48;
const LON = 7.21;
const API_URL = 'https://api.brightsky.dev';

@Injectable()
export class WeatherServiceWorker {
  private logger = new Logger(WeatherServiceWorker.name);
  private _currentDwDWeather = new BehaviorSubject<
    CurrentWeatherResponseDto['weather'] | null
  >(null);

  get $currentDwDWeather() {
    return this._currentDwDWeather.asObservable();
  }

  constructor(
    private readonly http: HttpService,
    private readonly eventEmitter: EventEmitter2,
    private readonly influx: InfluxDbService
  ) {
    this._currentDwDWeather.subscribe((weather) => {
      if (!weather) return;

      this.logger.verbose(
        `Got new weather at ${weather?.timestamp.toLocaleString()}`
      );
      // Write datapoint in influx
      const point = new Point('dwd_current_weather')
        .tag('source', 'dwd')
        .timestamp(weather.timestamp);

      for (const key in weather) {
        if (Object.prototype.hasOwnProperty.call(weather, key)) {
          const value = weather[key];
          if (typeof value === 'number') {
            point.floatField(key, value);
          } else if (typeof value === 'string') {
            point.stringField(key, value);
          } else {
            point.stringField(key, JSON.stringify(value));
          }
        }
      }
      this.influx.write('ontop.hs-bochum.de', 'initial', point);
      this.eventEmitter.emit('dwd.weather.updated', weather);
    });
  }

  // Get current weather at :5, :35
  @Cron('0 5,35 * * * *')
  async getCurrentDwDWeather() {
    try {
      const response = await lastValueFrom(
        this.http.get<CurrentWeatherResponseDto>(
          `${API_URL}/current_weather?lat=${LAT}&lon=${LON}`
        )
      );
      const data = plainToInstance(
        CurrentWeatherResponseDto,
        response.data
      ).weather;
      this._currentDwDWeather.next(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
