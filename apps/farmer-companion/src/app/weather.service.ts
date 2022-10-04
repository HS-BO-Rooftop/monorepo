import { Injectable } from '@angular/core';
import { startOfDay } from 'date-fns';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { DwdWeatherDto, WeatherForcastDto } from './api/models';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
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
              if (!morning) {
                return null;
              }
              return {
                date: startOfDay(new Date(morning.timestamp)),
                morning,
                day,
                evening,
                night,
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

  constructor() {
    this.listenToCurrentWeatherStream();
    this.listenToForecastWeatherStream();
  }

  private listenToCurrentWeatherStream(): void {
    const source = new EventSource(
      `${environment.apiUrl}/weather/current/dwd/sse`
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
      `${environment.apiUrl}/weather/forecast/dwd/sse`
    );
    source.addEventListener('message', this.onNewWeatherForecast.bind(this));
  }

  private onNewWeatherForecast({ data }: MessageEvent<string | null>): void {
    if (data !== null) {
      const parsedData = JSON.parse(data) as WeatherForcastDto[];
      this._weatherForecast.next(parsedData);
    }
  }
}

export type WeatherForecastForDay = {
  date: Date;
  morning: WeatherForcastDto;
  day?: WeatherForcastDto;
  evening?: WeatherForcastDto;
  night?: WeatherForcastDto;
};
