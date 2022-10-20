import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Chart } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { NgChartsModule } from 'ng2-charts';
import { SwiperModule } from 'swiper/angular';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { DataGraphComponent } from './data-graph/data-graph.component';
import { LinkSliderCardComponent } from './link-slider/link-slider-card/link-slider-card.component';
import { LinkSliderComponent } from './link-slider/link-slider.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { WeatherIconComponent } from './weather-forecast/weather-icon/weather-icon.component';

Chart.register(zoomPlugin);

@NgModule({
  declarations: [
    WeatherForecastComponent,
    WeatherIconComponent,
    LinkSliderComponent,
    LinkSliderCardComponent,
    CurrentWeatherComponent,
    DataGraphComponent,
  ],
  imports: [
    CommonModule,
    SwiperModule,
    RouterModule,
    TranslateModule,
    IonicModule,
    NgChartsModule,
  ],
  exports: [
    WeatherForecastComponent,
    WeatherIconComponent,
    LinkSliderComponent,
    CurrentWeatherComponent,
    DataGraphComponent,
  ],
})
export class WidgetsModule {}
