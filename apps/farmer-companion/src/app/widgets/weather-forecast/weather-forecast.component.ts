import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { WeatherForecastForDay, WeatherService } from '../../weather.service';

@Component({
  selector: 'rooftop-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
})
export class WeatherForecastComponent implements OnInit {
  locale = 'en-US';

  constructor(public weatherService: WeatherService) {}

  ngOnInit(): void {
    this.locale = navigator.language;
  }

  public getShortDay(date: Date): string {
    return Intl.DateTimeFormat(this.locale, { weekday: 'short' }).format(date);
  }

  public getDayOfMonth(date: Date): string {
    return format(date, 'd');
  }

  public getDayData(day?: WeatherForecastForDay | null) {
    if (!day) {
      return null;
    }
    if (day.day) {
      return day.day;
    } else if (day.morning) {
      return day.morning;
    }
    return null;
  }
}
