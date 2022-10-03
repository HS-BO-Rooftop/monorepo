/* tslint:disable */
/* eslint-disable */
export interface UpdateSensorDto {

  /**
   * The I2C address of the sensor
   */
  i2cAddress?: number;

  /**
   * The name of this sensor
   */
  name?: string;

  /**
   * The UUID of the sensor interface
   */
  sensorInterfaceId?: string;

  /**
   * The UUID of the sensor type
   */
  sensorTypeId?: string;
}
