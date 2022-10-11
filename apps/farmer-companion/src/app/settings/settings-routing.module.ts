import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatterySettingsPage } from './battery-settings/battery-settings.component';
import { BedSettingsPage } from './beds-settings/bed-settings/bed-settings.component';
import { BedsSettingsPage } from './beds-settings/beds-settings.component';
import { BoardSensorSettingsPage } from './boards-settings/board-sensor-settings/board-sensor-settings.component';
import { BoardSettingsPage } from './boards-settings/board-settings/board-settings.component';
import { BoardsSettingsPage } from './boards-settings/boards-settings.component';
import { PlantsSettingsPage } from './plants-settings/plants-settings.component';
import { ProfileSettingsPage } from './profile-settings/profile-settings.component';
import { SensorsSettingsPage } from './sensors-settings/sensors-settings.component';
import { SettingsComponent } from './settings.component';
import { UsersSettingsPage } from './users-settings/users-settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
  },
  { path: 'profile', component: ProfileSettingsPage },
  { path: 'users', component: UsersSettingsPage },
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
  { path: 'sensors', component: SensorsSettingsPage },
  { path: 'battery', component: BatterySettingsPage },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
