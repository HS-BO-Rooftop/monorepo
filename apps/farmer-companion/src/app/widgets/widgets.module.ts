import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { WeatherIconComponent } from './weather-forecast/weather-icon/weather-icon.component';

@NgModule({
  declarations: [WeatherForecastComponent, WeatherIconComponent],
  imports: [CommonModule],
  exports: [WeatherForecastComponent, WeatherIconComponent],
})
export class WidgetsModule {}
