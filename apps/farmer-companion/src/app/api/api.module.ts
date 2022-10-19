/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { VersionService } from './services/version.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { BoardsService } from './services/boards.service';
import { RegisterService } from './services/register.service';
import { BoardPinsService } from './services/board-pins.service';
import { ConfigurationService } from './services/configuration.service';
import { ConfigurationsService } from './services/configurations.service';
import { SensorsService } from './services/sensors.service';
import { SensorTypesService } from './services/sensor-types.service';
import { SensorInterfacesService } from './services/sensor-interfaces.service';
import { PlantsService } from './services/plants.service';
import { WeatherService } from './services/weather.service';
import { HeartbeatService } from './services/heartbeat.service';
import { BedsService } from './services/beds.service';
import { DataService } from './services/data.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    VersionService,
    AuthService,
    UserService,
    BoardsService,
    RegisterService,
    BoardPinsService,
    ConfigurationService,
    ConfigurationsService,
    SensorsService,
    SensorTypesService,
    SensorInterfacesService,
    PlantsService,
    WeatherService,
    HeartbeatService,
    BedsService,
    DataService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
