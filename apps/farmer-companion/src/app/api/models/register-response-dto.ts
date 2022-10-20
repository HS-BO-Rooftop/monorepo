/* tslint:disable */
/* eslint-disable */
import { PlantDto } from './plant-dto';
export interface RegisterResponseDto {
  bed?: null | PlantDto;
  bed_id?: null | string;

  /**
   * Existing configuration of the board. Will be set if the provided id was valid
   */
  configurations?: Array<string>;

  /**
   * ID of the board
   */
  id?: string;

  /**
   * The last time the board was seen
   */
  last_seen_at?: null | string;

  /**
   * The name of the board
   */
  name?: string;
  plant?: PlantDto;
  plant_id?: null | string;

  /**
   * Server timestamp when the response was send to the client
   */
  timestamp: number;
}
