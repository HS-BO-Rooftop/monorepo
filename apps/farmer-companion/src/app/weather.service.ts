import { Injectable } from '@angular/core';
import { startOfDay } from 'date-fns';
import { BehaviorSubject, map, Observable, timer } from 'rxjs';
import { environment } from '../environments/environment';
import {
  DwdWeatherDto,
  LocalWeatherStationRow,
  WeatherForcastDto,
  WeatherTodayResponseDto,
} from './api/models';
import { WeatherService } from './api/services';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  private _currentWeather = new BehaviorSubject<DwdWeatherDto | null>(null);

  get $currentWeather() {
    return this._currentWeather.asObservable();
  }

  private _weatherForecast = new BehaviorSubject<WeatherForcastDto[] | null>(
    null
  );

  get $weatherForecast() {
    return this._weatherForecast.asObservable();
  }

  get $weatherForecastForDays(): Observable<
    (WeatherForecastForDay | null)[] | null
  > {
    return this._weatherForecast.pipe(
      map((data) => {
        if (data === null) {
          return null;
        }
        /**
         * Foreach day get
         * morning 9AM
         * day 12AM
         * evening 6PM
         * Night 3AM
         * Weather
         */
        // Group the forecast by day
        const map = new Map<string, WeatherForcastDto[]>();
        data.forEach((item) => {
          const date = new Date(item.timestamp);
          const day = date.toDateString();
          const items = map.get(day);
          if (items) {
            items.push(item);
          } else {
            map.set(day, [item]);
          }
        });

        // Get the forecast for each day
        return (
          Array.from(map.entries())
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .map(([_, items]) => {
              const morning = items.find((item) => {
                const date = new Date(item.timestamp);
                return date.getHours() === 9;
              });
              const day = items.find((item) => {
                const date = new Date(item.timestamp);
                return date.getHours() === 12;
              });
              const evening = items.find((item) => {
                const date = new Date(item.timestamp);
                return date.getHours() === 18;
              });
              const night = items.find((item) => {
                const date = new Date(item.timestamp);
                return date.getHours() === 3;
              });
              // Get the start of the day
              const date = new Date(items[0].timestamp);
              return {
                date: startOfDay(date),
                night,
                morning,
                day,
                evening,
              } as WeatherForecastForDay;
            })
            .sort((a, b) => {
              if (a === null || b === null) {
                return 0;
              }
              return a.date.getTime() - b.date.getTime();
            })
        );
      })
    );
  }

  private _currentLocalWeather =
    new BehaviorSubject<LocalWeatherStationRow | null>(null);

  get $currentLocalWeather() {
    return this._currentLocalWeather.asObservable();
  }

  private _todayWeather = new BehaviorSubject<WeatherTodayResponseDto | null>(
    null
  );

  get $todayWeather(): Observable<WeatherTodayResponseDto | null> {
    return this._todayWeather.asObservable();
  }

  constructor(private readonly weatherApi: WeatherService) {
    this.listenToCurrentWeatherStream();
    this.listenToForecastWeatherStream();
    this.listenToCurrentLocalWeatherStream();
    this.longPollTodayWeather();
  }

  private listenToCurrentWeatherStream(): void {
    const source = new EventSource(
      `${environment.apiUrl}/api/weather/current/dwd/sse`
    );
    source.addEventListener('message', this.onNewCurrentWeather.bind(this));
  }

  private onNewCurrentWeather({ data }: MessageEvent<string | null>): void {
    if (data !== null) {
      const parsedData = JSON.parse(data) as DwdWeatherDto;
      this._currentWeather.next(parsedData);
    }
  }

  private listenToForecastWeatherStream(): void {
    const source = new EventSource(
      `${environment.apiUrl}/api/weather/forecast/dwd/sse`
    );
    source.addEventListener('message', this.onNewWeatherForecast.bind(this));
  }

  private onNewWeatherForecast({ data }: MessageEvent<string | null>): void {
    if (data !== null) {
      const parsedData = JSON.parse(data) as WeatherForcastDto[];
      this._weatherForecast.next(parsedData);
    }
  }

  private listenToCurrentLocalWeatherStream(): void {
    const source = new EventSource(
      `${environment.apiUrl}/api/weather/current/local/sse`
    );
    source.addEventListener(
      'message',
      this.onNewCurrentLocalWeather.bind(this)
    );
  }

  private onNewCurrentLocalWeather({
    data,
  }: MessageEvent<string | null>): void {
    if (data !== null) {
      const parsedData = JSON.parse(data) as LocalWeatherStationRow;
      this._currentLocalWeather.next(parsedData);
    }
  }

  private longPollTodayWeather(): void {
    timer(0, 1000 * 60 * 60).subscribe(() => {
      this.weatherApi.weatherControllerGetToday().subscribe((data) => {
        this._todayWeather.next(data);
      });
    });
  }
}

export type WeatherForecastForDay = {
  date: Date;
  night?: WeatherForcastDto;
  morning?: WeatherForcastDto;
  day?: WeatherForcastDto;
  evening?: WeatherForcastDto;
};
