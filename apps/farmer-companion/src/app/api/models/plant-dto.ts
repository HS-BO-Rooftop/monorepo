/* tslint:disable */
/* eslint-disable */
import { BoardDto } from './board-dto';
export interface PlantDto {
  boards: Array<BoardDto>;
  id: string;
  image_url: string;
  name_de: string;
  name_en: string;
}
