/* tslint:disable */
/* eslint-disable */
import { SensorData } from './sensor-data';
export interface BedSensorDataDto {
  boardId: string;
  boardName: string;
  data: Array<SensorData>;
}
