/* tslint:disable */
/* eslint-disable */
import { PlantDto } from './plant-dto';
export interface BoardDto {
  bed: null | PlantDto;
  bed_id: null | string;

  /**
   * The id of the board
   */
  id: string;

  /**
   * The last time the board was seen
   */
  last_seen_at: null | string;

  /**
   * The name of the board
   */
  name: string;
  plant: PlantDto;
  plant_id: null | string;
}
