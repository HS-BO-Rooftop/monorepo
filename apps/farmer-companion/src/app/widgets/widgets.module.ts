import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { LinkSliderCardComponent } from './link-slider/link-slider-card/link-slider-card.component';
import { LinkSliderComponent } from './link-slider/link-slider.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { WeatherIconComponent } from './weather-forecast/weather-icon/weather-icon.component';

@NgModule({
  declarations: [
    WeatherForecastComponent,
    WeatherIconComponent,
    LinkSliderComponent,
    LinkSliderCardComponent,
  ],
  imports: [CommonModule, SwiperModule, RouterModule],
  exports: [
    WeatherForecastComponent,
    WeatherIconComponent,
    LinkSliderComponent,
  ],
})
export class WidgetsModule {}
