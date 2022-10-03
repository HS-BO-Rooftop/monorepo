import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';

@NgModule({
  declarations: [WeatherForecastComponent],
  imports: [CommonModule],
  exports: [WeatherForecastComponent],
})
export class WidgetsModule {}
