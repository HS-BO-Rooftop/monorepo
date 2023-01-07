import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ISerializeable } from "../ISerializeable";

export type actionTypes = 'gpio_action' | 'watering_action';

export interface IAction extends ISerializeable {
  type: actionTypes;
  performAction(): void;
}

export class ActionJsonData {
  @ApiProperty()
  type: actionTypes;
  @ApiPropertyOptional()
  boardId?: string;
  @ApiPropertyOptional()
  pinId?: string;
  @ApiPropertyOptional()
  newState?: boolean;
}