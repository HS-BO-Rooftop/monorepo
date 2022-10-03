/* tslint:disable */
/* eslint-disable */
export interface CreateBoardSensorDto {

  /**
   * The UUID of the board. Needs to be a v4 UUID
   */
  deviceId: string;

  /**
   * Whether the sensor is connected to the board and active
   */
  isConnected: boolean;

  /**
   * The UUID of the pin. Needs to be a v4 UUID
   */
  pinId: string;

  /**
   * The UUID of the sensor. Needs to be a v4 UUID
   */
  sensorId: string;
}
