import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { RooftopCommonModule } from '../common/common.module';

import { AutomationSettingsPage } from './automations-settings/automation-settings/automation-settings.component';
import { CurrentWeatherValueConditionComponent } from './automations-settings/automation-settings/current-weather-value-condition/current-weather-value-condition.component';
import { GpioDurationActionComponent } from './automations-settings/automation-settings/gpio-duration-action/gpio-duration-action.component';
import { SensorValueConditionComponent } from './automations-settings/automation-settings/sensor-value-condition/sensor-value-condition.component';
import { TimeSinceLastRunConditionComponent } from './automations-settings/automation-settings/time-since-last-run-condition/time-since-last-run-condition.component';
import { TimeValueConditionComponent } from './automations-settings/automation-settings/time-value-condition/time-value-condition.component';
import { ToggleGpioActionComponent } from './automations-settings/automation-settings/toggle-gpio-action/toggle-gpio-action.component';
import { WeatherForecastValueConditionComponent } from './automations-settings/automation-settings/weather-forecast-value-condition/weather-forecast-value-condition.component';
import { AutomationsSettingsPage } from './automations-settings/automations-settings.component';
import { BatterySettingsPage } from './battery-settings/battery-settings.component';
import { BedSettingsPage } from './beds-settings/bed-settings/bed-settings.component';
import { BedsSettingsPage } from './beds-settings/beds-settings.component';
import { BoardSensorSettingsPage } from './boards-settings/board-sensor-settings/board-sensor-settings.component';
import { BoardSettingsPage } from './boards-settings/board-settings/board-settings.component';
import { BoardsSettingsPage } from './boards-settings/boards-settings.component';
import { PlantSettingsPage } from './plants-settings/plant-settings/plant-settings.component';
import { PlantsSettingsPage } from './plants-settings/plants-settings.component';
import { ProfileSettingsPage } from './profile-settings/profile-settings.component';
import { SensorsSettingsPage } from './sensors-settings/sensors-settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { UserSettingsPage } from './users-settings/user-settings/user-settings.component';
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
    BoardSensorSettingsPage,
    BedSettingsPage,
    UserSettingsPage,
    AutomationsSettingsPage,
    AutomationSettingsPage,
    SensorValueConditionComponent,
    TimeValueConditionComponent,
    CurrentWeatherValueConditionComponent,
    WeatherForecastValueConditionComponent,
    ToggleGpioActionComponent,
    GpioDurationActionComponent,
    TimeSinceLastRunConditionComponent,
    PlantSettingsPage,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    IonicModule,
    TranslateModule,
    RooftopCommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SettingsModule {}
