import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
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
    CurrentWeatherComponent,
  ],
  imports: [
    CommonModule,
    SwiperModule,
    RouterModule,
    TranslateModule,
    IonicModule,
  ],
  exports: [
    WeatherForecastComponent,
    WeatherIconComponent,
    LinkSliderComponent,
    CurrentWeatherComponent,
  ],
})
export class WidgetsModule {}
