import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { BatterySettingsPage } from './battery-settings/battery-settings.component';
import { BedsSettingsPage } from './beds-settings/beds-settings.component';
import { BoardSettingsPage } from './boards-settings/board-settings/board-settings.component';
import { BoardsSettingsPage } from './boards-settings/boards-settings.component';
import { PlantsSettingsPage } from './plants-settings/plants-settings.component';
import { ProfileSettingsPage } from './profile-settings/profile-settings.component';
import { SensorsSettingsPage } from './sensors-settings/sensors-settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { UsersSettingsPage } from './users-settings/users-settings.component';

@NgModule({
  declarations: [
    SettingsComponent,
    ProfileSettingsPage,
    UsersSettingsPage,
    PlantsSettingsPage,
    BedsSettingsPage,
    BoardsSettingsPage,
    SensorsSettingsPage,
    BatterySettingsPage,
    BoardSettingsPage,
  ],
  imports: [CommonModule, SettingsRoutingModule, IonicModule, TranslateModule],
})
export class SettingsModule {}
