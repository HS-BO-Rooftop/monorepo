import { Point } from '@influxdata/influxdb-client';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron } from '@nestjs/schedule';
import { plainToInstance } from 'class-transformer';
import { addDays, endOfDay } from 'date-fns';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { InfluxDbService } from '../influx-db/influx-db.service';
import {
  CurrentWeatherResponseDto,
  DwdWeatherDto
} from './dto/dwd/current-weather-response.dto';
import { WeatherForecastResponseDto } from './dto/dwd/forecast-weather-response.dto';

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

  private _dwdWeatherForecast = new BehaviorSubject<
    WeatherForecastResponseDto['weather'] | null
  >(null);

  get $dwdWeatherForecast() {
    return this._dwdWeatherForecast.asObservable();
  }

  constructor(
    private readonly http: HttpService,
    private readonly eventEmitter: EventEmitter2,
    private readonly influx: InfluxDbService
  ) {
    this._currentDwDWeather.subscribe(async (weather) => {
      if (!weather) return;

      this.logger.verbose(
        `Got new weather at ${weather?.timestamp.toLocaleString()}`
      );

      let parsedWeather;
      try {
        // Write datapoint in influx
        const point = new Point('dwd_current_weather')
          .tag('source', 'dwd')
          .timestamp(weather.timestamp);
        parsedWeather = plainToInstance(DwdWeatherDto, weather);
        for (const key in parsedWeather) {
          if (Object.prototype.hasOwnProperty.call(weather, key)) {
            const value = weather[key];
            if (typeof value === 'number') {
              point.floatField(key, value);
            } else if (value === null) {
              continue;
            } else if (typeof value === 'string') {
              point.stringField(key, value);
            } else {
              point.stringField(key, JSON.stringify(value));
            }
          }
        }
        await this.influx.write('ontop.hs-bochum.de', 'initial', point);
      } catch (error) {
        console.error(error);
        return;
      }
      this.eventEmitter.emit('dwd.current_weather.updated', weather);
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

  @Cron('0 5 * * * *')
  async getWeatherForecast() {
    const startDate = new Date();
    const endDate = endOfDay(addDays(startDate, 10));

    try {
      const response = await lastValueFrom(
        this.http.get<WeatherForecastResponseDto>(
          `${API_URL}/weather?lat=${LAT}&lon=${LON}&date=${startDate.toISOString()}&last_date=${endDate.toISOString()}`
        )
      );
      this._dwdWeatherForecast.next(response.data.weather);
      return response.data.weather;
    } catch (error) {
      this.logger.error('Error getting weather forecast', error);
      console.error(error);
    }
  }
}
