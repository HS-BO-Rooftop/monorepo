/* tslint:disable */
/* eslint-disable */
import { SensorInterfaceDto } from './sensor-interface-dto';
import { SensorTypeDto } from './sensor-type-dto';
export interface SensorConfigurationDto {

  /**
   * The i2c address of the sensor. Only applicable to i2c interfaced sensors.
   */
  i2cAddress?: number;

  /**
   * The unique identifier of the sensor configuration.
   */
  id: string;

  /**
   * The sensor interface of the sensor configuration.
   */
  interface: SensorInterfaceDto;

  /**
   * The name of the sensor configuration.
   */
  name: string;

  /**
   * The id of the sensor interface.
   */
  sensorInterfaceId: string;

  /**
   * The sensor type of the sensor configuration.
   */
  sensorType: SensorTypeDto;

  /**
   * The id of the sensor type.
   */
  sensorTypeId: string;
}
