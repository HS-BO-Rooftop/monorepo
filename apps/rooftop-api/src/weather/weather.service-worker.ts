import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron } from '@nestjs/schedule';
import { plainToInstance } from 'class-transformer';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { InfluxDbService, QueryRow } from '../influx-db/influx-db.service';
import { CurrentWeatherResponseDto } from './dto/dwd/current-weather-response.dto';
import { LocalWeatherStationRow } from './dto/local/weather-station-data.type';

const LAT = 51.48;
const LON = 7.21;
const API_URL = 'https://api.brightsky.dev';

@Injectable()
export class WeatherServiceWorker {
  private logger = new Logger(WeatherServiceWorker.name);
  private _currentDwDWeather = new BehaviorSubject<
    CurrentWeatherResponseDto['weather'] | null
  >(null);

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
      this.eventEmitter.emit('current_weather', weather);
    });
    this.getCurrentDwDWeather();
    this.getCurrentLocalWeather();
  }

  // Get current weatherat :00, :30
  @Cron('0 */30 * * * *')
  async getCurrentDwDWeather() {
    try {
      const response = await lastValueFrom(
        this.http.get<CurrentWeatherResponseDto>(
          `${API_URL}/current_weather?lat=${LAT}&lon=${LON}`
        )
      );
      this._currentDwDWeather.next(
        plainToInstance(CurrentWeatherResponseDto, response.data).weather
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentLocalWeather() {
    const weather = await this.influx.query<LocalWeatherStationRow>(
      'ontop.hs-bochum.de',
      `
      from(bucket: "initial")
        |> range(start: 2022-09-04T00:00:00Z, stop: 2022-09-18T00:00:00Z)
        |> filter(fn: (r) => r._measurement == "Wetterstationen")
        |> filter(fn: (r) => r["Station"] == "1")
        |> aggregateWindow(every: 1d, fn: mean)
      `
    );
    // Get the latest values
    const latest = Object.fromEntries(
      Object.entries(weather).map(([key, value]) => [
        key,
        value[value.length - 1],
      ])
    ) as QueryRow<LocalWeatherStationRow>;

    // Check if all values are null
    if (Object.values(latest).every((value) => value === null)) return;

    this.logger.verbose(
      `Got new local weather at ${latest.temp._time.toLocaleString()}`
    );
    this.eventEmitter.emit('current_local_weather', latest);
  }
}
