/* tslint:disable */
/* eslint-disable */
export interface RegisterResponseDto {

  /**
   * Existing configuration of the board. Will be set if the provided id was valid
   */
  configurations?: Array<string>;

  /**
   * ID of the board
   */
  id?: string;

  /**
   * The name of the board
   */
  name?: string;

  /**
   * Server timestamp when the response was send to the client
   */
  timestamp: string;
}
