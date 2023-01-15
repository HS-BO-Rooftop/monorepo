import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ISerializeable } from "../ISerializeable";

export type actionTypes = 'gpio_action' | 'watering_action' | 'gpio-duration';

export interface IAction extends ISerializeable {
  type: actionTypes;
  performAction(): void;

  dispose(): void;
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
  @ApiPropertyOptional()
  duration?: number;
}