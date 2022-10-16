import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { endOfDay, isSameDay, startOfDay, subDays } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { BehaviorSubject } from 'rxjs';
import {
  InfluxDbService,
  QueryData,
  QueryRow,
} from '../influx-db/influx-db.service';
import { CurrentWeatherResponseDto } from './dto/dwd/current-weather-response.dto';
import { WeatherForecastResponseDto } from './dto/dwd/forecast-weather-response.dto';
import { DwdHistoricWeatherRow } from './dto/dwd/historic-weather.dto';
import { LocalWeatherStationRow } from './dto/local/weather-station-data.type';
import { WeatherTodayResponseDto } from './dto/weather-today-response.dto';
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

  private _dwdForecast = new BehaviorSubject<
    WeatherForecastResponseDto['weather'] | null
  >(null);

  get $dwdForecast() {
    return this._dwdForecast.asObservable();
  }

  get dwdForecast() {
    return this._dwdForecast.getValue();
  }

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
    const initialCurrentWeatherData =
      await this.serviceWorker.getCurrentDwDWeather();
    this._currentDwDWeather.next(initialCurrentWeatherData);
    const initialWeatherForecastData =
      await this.serviceWorker.getWeatherForecast();
    this._dwdForecast.next(initialWeatherForecastData);
    this.getCurrentLocalWeather();
  }

  @OnEvent('dwd.current_weather.updated')
  async updateDwDWeather(weather: CurrentWeatherResponseDto['weather']) {
    this._currentDwDWeather.next(weather);
  }

  @OnEvent('dwd.forecast.updated')
  async updateForecastWeather(weather: WeatherForecastResponseDto['weather']) {
    this._dwdForecast.next(weather);
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

  /**
   * Gets the weather for today in 1h intervals
   * Prefers the local weather station data
   * If the local weather station data is not available, it uses the DWD data
   * Also adds the forecast data for today
   */
  async getTodayWeather() {
    // Get the local weather station data
    const today = new Date();
    const start = utcToZonedTime(startOfDay(today), 'Europe/Berlin');
    const end = utcToZonedTime(endOfDay(today), 'Europe/Berlin');
    const returnData: WeatherTodayResponseDto = {
      weather: [],
    };

    const map = await this.getTodayLocalWeather(start, end);
    // Add the data to the return data
    map.forEach((value, key) => {
      returnData.weather.push({
        timestamp: new Date(key),
        humidity: value.humidity,
        temperature: value.temp,
        windSpeed: value.windspeed,
        rain: value.rain,
        icon: null,
        solarDuration: null,
      });
    });

    const groupedDwdWeather = await this.getTodayDwdWeather(start, end);
    groupedDwdWeather.forEach((value, key) => {
      const existing = returnData.weather.find(
        (weather) => weather.timestamp.getHours() === new Date(key).getHours()
      );
      if (existing) {
        existing.solarDuration = value.sunshine_60;
      } else {
        returnData.weather.push({
          timestamp: new Date(key),
          humidity: value.relative_humidity,
          temperature: value.temperature,
          windSpeed: value.wind_speed_60,
          rain: value.precipitation_60,
          icon: value.icon,
          solarDuration: value.sunshine_60,
        });
      }
    });

    // Query the icons
    const groupedIcons = await this.getTodayIcons(start, end);
    groupedIcons.forEach((value, key) => {
      const existing = returnData.weather.find(
        (weather) => weather.timestamp.getHours() === new Date(key).getHours()
      );
      if (existing) {
        existing.icon = value.icon;
      }
    });

    // Add the forecast data
    const forecast = this.dwdForecast;
    if (forecast) {
      forecast.forEach((value) => {
        // Check if the forecast is for today
        const timestamp = new Date(value.timestamp);
        if (timestamp < start || timestamp > end) {
          return;
        }

        const existing = returnData.weather.find(
          (weather) => weather.timestamp.getHours() === timestamp.getHours()
        );
        if (existing && existing.temperature === null) {
          existing.temperature = value.temperature;
          existing.humidity = null;
          existing.windSpeed = value.wind_speed;
          existing.rain = value.precipitation;
          existing.icon = value.icon;
          existing.solarDuration = value.sunshine;
        }
      });
    }

    // Remove all elements that have no temperature
    returnData.weather = returnData.weather.filter(
      (weather) => weather.temperature !== null
    );

    return returnData;
  }

  private async getTodayIcons(start: Date, end: Date) {
    type responseType = CurrentWeatherResponseDto['weather'];
    const icons = await this.influx.query<responseType>(
      'ontop.hs-bochum.de',
      `
      from(bucket: "initial")
        |> range(start: ${start.toISOString()}, stop: ${end.toISOString()})
        |> filter(fn: (r) => r["_measurement"] == "dwd_current_weather")
        |> filter(fn: (r) => r["source"] == "dwd")
        |> filter(fn: (r) => r["_field"] == "icon")
        |> aggregateWindow(every: 1h, fn: last)
        |> yield(name: "last")
      `
    );

    const groupedIcons = this.groupByTimestamp<responseType>(icons);
    return groupedIcons;
  }

  private async getTodayDwdWeather(start: Date, end: Date) {
    const dwdWeather = await this.influx.query<
      CurrentWeatherResponseDto['weather']
    >(
      'ontop.hs-bochum.de',
      `
      from(bucket: "initial")
        |> range(start: ${start.toISOString()}, stop: ${end.toISOString()})
        |> filter(fn: (r) => r["_measurement"] == "dwd_current_weather")
        |> filter(fn: (r) => r["source"] == "dwd")
        |> filter(fn: (r) => r["_field"] == "sunshine_60" or r["_field"] == "temperature" or r["_field"] == "wind_speed_60" or r["_field"] == "precipitation_60")
        |> aggregateWindow(every: 1h, fn: mean)
        |> yield(name: "mean")
      `
    );

    const groupedDwdWeather =
      this.groupByTimestamp<CurrentWeatherResponseDto['weather']>(dwdWeather);
    return groupedDwdWeather;
  }

  private async getTodayLocalWeather(start: Date, end: Date) {
    const localWeather = await this.influx.query<LocalWeatherStationRow>(
      'ontop.hs-bochum.de',
      `
      from(bucket: "initial")
        |> range(start: ${start.toISOString()}, stop: ${end.toISOString()})
        |> filter(fn: (r) => r._measurement == "Wetterstationen")
        |> filter(fn: (r) => r["Station"] == "1")
        |> aggregateWindow(every: 1h, fn: mean)
        |> yield(name: "mean")
      `
    );
    // Group the data by hour
    const map = this.groupByTimestamp<LocalWeatherStationRow>(localWeather);
    return map;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private groupByTimestamp<T>(localWeather: QueryData<any>) {
    const map = new Map<string, T>();
    Object.entries(localWeather).forEach(([key, value]) => {
      value.forEach((row) => {
        try {
          const date = new Date(row._time).toISOString();
          if (!map.has(date)) {
            map.set(date, {} as T);
          }
          map.get(date)[key] = row._value;
        } catch (error) {
          return;
        }
      });
    });

    return map;
  }

  async getHistoricWeather(from = subDays(new Date(), 365), to = new Date()) {
    const localWeather = await this.influx.query<LocalWeatherStationRow>(
      'ontop.hs-bochum.de',
      `
      from(bucket: "initial")
        |> range(start: ${from.toISOString()}, stop: ${to.toISOString()})
        |> filter(fn: (r) => r._measurement == "Wetterstationen")
        |> filter(fn: (r) => r["Station"] == "1")
        |> aggregateWindow(every: 1d, fn: mean)
        |> yield(name: "mean")
      `
    );

    const dwdWeather = await this.influx.query<
      CurrentWeatherResponseDto['weather']
    >(
      'ontop.hs-bochum.de',
      `
      from(bucket: "initial")
        |> range(start: ${from.toISOString()}, stop: ${to.toISOString()})
        |> filter(fn: (r) => r["_measurement"] == "dwd_current_weather")
        |> filter(fn: (r) => r["source"] == "dwd")
        |> filter(fn: (r) => r["_field"] == "sunshine_60" or r["_field"] == "temperature" or r["_field"] == "wind_speed_60" or r["_field"] == "precipitation_60")
        |> aggregateWindow(every: 1d, fn: mean)
        |> yield(name: "mean")
      `
    );

    const groupedLocalWeather =
      this.groupByTimestamp<LocalWeatherStationRow>(localWeather);
    const groupedDwdWeather =
      this.groupByTimestamp<CurrentWeatherResponseDto['weather']>(dwdWeather);

    const returnData: WeatherTodayResponseDto = {
      weather: [],
    };

    groupedLocalWeather.forEach((value, key) => {
      const date = new Date(key);
      const existing = returnData.weather.find((weather) =>
        isSameDay(weather.timestamp, date)
      );
      if (!existing) {
        returnData.weather.push({
          timestamp: date,
          temperature: value.temp,
          windSpeed: value.windspeed,
          rain: value.rain,
          icon: null,
          solarDuration: null,
          humidity: value.humidity,
        });
      }
    });

    groupedDwdWeather.forEach((value, key) => {
      const date = new Date(key);
      const existing = returnData.weather.find((weather) =>
        isSameDay(weather.timestamp, date)
      );
      if (!existing) {
        returnData.weather.push({
          timestamp: date,
          temperature: value.temperature,
          windSpeed: value.wind_speed_60,
          rain: value.precipitation_60,
          icon: value.icon,
          solarDuration: value.sunshine_60,
          humidity: value.relative_humidity,
        });
      } else {
        existing.icon = value.icon;
        existing.solarDuration = value.sunshine_60;
        existing.temperature = existing.temperature ?? value.temperature;
        existing.windSpeed = existing.windSpeed ?? value.wind_speed_60;
        existing.rain = existing.rain ?? value.precipitation_60;
        existing.humidity = existing.humidity ?? value.relative_humidity;
      }
    });

    const historicData = await this.influx.query<DwdHistoricWeatherRow>(
      'ontop.hs-bochum.de',
      `
      from(bucket: "initial")
        |> range(start: ${from.toISOString()}, stop: ${to.toISOString()})
        |> filter(fn: (r) => r["_measurement"] == "dwd_current_weather")
        |> filter(fn: (r) => r["source"] == "dwd")
        |> filter(fn: (r) => r["_field"] == "temperature" or r["_field"] == "wind_speed" or r["_field"] == "precipitation " or r["_field"] == "wind_direction" or r["_field"] == "precipitation")
        |> aggregateWindow(every: 1d, fn: mean)
        |> yield(name: "mean")
      `
    );

    const groupedHistoricData =
      this.groupByTimestamp<DwdHistoricWeatherRow>(historicData);

    groupedHistoricData.forEach((value, key) => {
      const date = new Date(key);
      const existing = returnData.weather.find((weather) =>
        isSameDay(weather.timestamp, date)
      );
      if (!existing) {
        returnData.weather.push({
          timestamp: date,
          temperature: value.temperature,
          windSpeed: value.wind_speed,
          rain: value.precipitation,
          icon: null,
          solarDuration: null,
          humidity: null,
        });
      } else {
        existing.temperature = existing.temperature ?? value.temperature;
        existing.windSpeed = existing.windSpeed ?? value.wind_speed;
        existing.rain = existing.rain ?? value.precipitation;
      }
    });

    returnData.weather.sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
    );
    return returnData;
  }
}
