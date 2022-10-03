/* tslint:disable */
/* eslint-disable */
import { BoardDto } from './board-dto';
import { BoardPinDto } from './board-pin-dto';
import { SensorConfigurationDto } from './sensor-configuration-dto';
export interface BoardConfigurationDto {

  /**
   * The board this configuration refers to
   */
  board: BoardDto;

  /**
   * The pin the sensor is connected to
   */
  boardPin: BoardPinDto;

  /**
   * The UUID of the configuration. Must be a UUID v4
   */
  id: string;

  /**
   * True if the configuration is active
   */
  isConnected: boolean;

  /**
   * The sensor configuration
   */
  sensor: SensorConfigurationDto;
}
