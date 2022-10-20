import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { WidgetsModule } from '../widgets/widgets.module';
import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';

@NgModule({
  declarations: [WeatherComponent],
  imports: [
    IonicModule,
    CommonModule,
    WeatherRoutingModule,
    TranslateModule,
    WidgetsModule,
  ],
})
export class WeatherModule {}
