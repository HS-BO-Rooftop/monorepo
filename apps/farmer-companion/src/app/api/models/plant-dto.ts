/* tslint:disable */
/* eslint-disable */
import { BoardDto } from './board-dto';
export interface PlantDto {
  boards: Array<BoardDto>;
  id: string;
  imageUrl: string;
  name_de: string;
  name_en: string;
}
