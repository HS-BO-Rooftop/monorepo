/* tslint:disable */
/* eslint-disable */
import { SensorConfigurationDto } from './sensor-configuration-dto';
import { SensorValue } from './sensor-value';
export interface SensorData {
  board_sensor_id: string;
  sensor: SensorConfigurationDto;
  values: Array<SensorValue>;
}
