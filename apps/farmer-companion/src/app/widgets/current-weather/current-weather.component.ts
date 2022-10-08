import { Component, OnInit } from '@angular/core';
import { closestIndexTo } from 'date-fns';
import { BehaviorSubject, filter } from 'rxjs';
import { DwdWeatherDto, WeatherTodayResponseDto } from '../../api/models';
import { loadingHelper } from '../../loading.service';
import { WeatherDataService } from '../../weather.service';

type WeatherData = {
  currentTemperature: number;
  todayHigh: number;
  todayLow: number;
  icon: DwdWeatherDto['icon'];
  rain: number;
  humidity: number | null;
  windSpeed: number;
  solarDuration: number;
};

@Component({
  selector: 'rooftop-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
  readonly data = new BehaviorSubject<WeatherData | null>(null);

  isLoading = new BehaviorSubject<boolean>(true);

  constructor(public readonly weatherService: WeatherDataService) {
    loadingHelper([this.data]).subscribe((loading) => {
      this.isLoading.next(loading);
    });
  }

  ngOnInit(): void {
    // Combine local and dwd weather data
    this.weatherService.$todayWeather
      .pipe(filter((val): val is WeatherTodayResponseDto => val !== null))
      .subscribe((data) => {
        // Get todays low and high
        const todayHigh = Math.max(
          ...data.weather.map((row) => row.temperature)
        );
        const todayLow = Math.min(
          ...data.weather.map((row) => row.temperature)
        );

        // Round to the nearest full hour
        const now = new Date();
        const dates = data.weather.map((row) => new Date(row.timestamp));
        const closestIndex = closestIndexTo(now, dates);
        if (!closestIndex) {
          return;
        }
        const weatherData = data.weather[closestIndex];

        if (weatherData) {
          this.data.next({
            currentTemperature: weatherData.temperature,
            todayHigh,
            todayLow,
            icon: weatherData.icon,
            rain: weatherData.rain,
            humidity: weatherData.humidity,
            windSpeed: weatherData.windSpeed,
            solarDuration: weatherData.solarDuration,
          });
        }
      });
  }
}
