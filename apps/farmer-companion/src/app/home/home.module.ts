import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { TranslateModule } from '@ngx-translate/core';
import { AppNavigationModule } from '../app-navigation/app-navigation.module';
import { WidgetsModule } from '../widgets/widgets.module';
import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    AppNavigationModule,
    WidgetsModule,
    TranslateModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
