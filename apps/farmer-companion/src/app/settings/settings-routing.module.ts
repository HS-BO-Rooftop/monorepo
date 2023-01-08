import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutomationSettingsPage } from './automations-settings/automation-settings/automation-settings.component';
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
import { SettingsComponent } from './settings.component';
import { UserSettingsPage } from './users-settings/user-settings/user-settings.component';
import { UsersSettingsPage } from './users-settings/users-settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
  },
  { path: 'profile', component: ProfileSettingsPage },
  { path: 'users', component: UsersSettingsPage },
  { path: 'users/create', component: UserSettingsPage },
  { path: 'users/:userId', component: UserSettingsPage },
  { path: 'beds', component: BedsSettingsPage },
  { path: 'beds/create', component: BedSettingsPage },
  { path: 'beds/:bedId', component: BedSettingsPage },
  {
    path: 'boards',
    component: BoardsSettingsPage,
  },
  {
    path: 'boards/:boardId',
    component: BoardSettingsPage,
  },
  {
    path: 'boards/:boardId/sensors/:sensorId',
    component: BoardSensorSettingsPage,
  },
  {
    path: 'boards/:boardId/sensors',
    component: BoardSensorSettingsPage,
  },
  { path: 'plants', component: PlantsSettingsPage },
  { path: 'plants/create', component: PlantSettingsPage },
  { path: 'plants/:id', component: PlantSettingsPage },
  { path: 'sensors', component: SensorsSettingsPage },
  { path: 'battery', component: BatterySettingsPage },
  { path: 'automations', component: AutomationsSettingsPage },
  { path: 'automations/create', component: AutomationSettingsPage },
  { path: 'automations/:automationId', component: AutomationSettingsPage },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
