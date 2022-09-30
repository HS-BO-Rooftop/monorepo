import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { BehaviorSubject } from 'rxjs';
import { InfluxDbService, QueryRow } from '../influx-db/influx-db.service';
import { CurrentWeatherResponseDto } from './dto/dwd/current-weather-response.dto';
import { LocalWeatherStationRow } from './dto/local/weather-station-data.type';
import { WeatherServiceWorker } from './weather.service-worker';

const LOCAL_WEATHER_DEBOUNCE_TIME = 5 * 60 * 1000;
@Injectable()
export class WeatherService {
  private logger = new Logger(WeatherService.name);
  private _currentLocalWeather =
    new BehaviorSubject<LocalWeatherStationRow | null>(null);

  private _lastLocalWeatherUpdateAt = new Date(0);

  private _currentDwDWeather = new BehaviorSubject<
    CurrentWeatherResponseDto['weather'] | null
  >(null);

  get $currentLocalWeather() {
    return this._currentLocalWeather.asObservable();
  }

  get $currentDwDWeather() {
    return this._currentDwDWeather.asObservable();
  }

  get currentDwDWeather() {
    return this._currentDwDWeather.getValue();
  }

  constructor(
    private readonly influx: InfluxDbService,
    private readonly serviceWorker: WeatherServiceWorker
  ) {
    this.init();
  }

  private async init() {
    const initialData = await this.serviceWorker.getCurrentDwDWeather();
    this._currentDwDWeather.next(initialData);
    this.getCurrentLocalWeather();
  }

  @OnEvent('dwd.weather.updated')
  async updateDwDWeather(weather: CurrentWeatherResponseDto['weather']) {
    this._currentDwDWeather.next(weather);
  }

  async getCurrentLocalWeather() {
    // Check if the last update was less than 5 minutes ago
    if (
      new Date().getTime() - this._lastLocalWeatherUpdateAt.getTime() <
      LOCAL_WEATHER_DEBOUNCE_TIME
    ) {
      this.logger.debug(
        'Not updating local weather, last update was less than 5 minutes ago'
      );
      return this._currentLocalWeather.getValue();
    }
    this._lastLocalWeatherUpdateAt = new Date();
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

    this._currentLocalWeather.next(
      Object.entries(latest).reduce((acc, [key, value]) => {
        if (value === null) return acc;
        return {
          ...acc,
          [key]: value._value,
        };
      }, {} as LocalWeatherStationRow)
    );

    return this._currentLocalWeather.getValue();
  }
}
