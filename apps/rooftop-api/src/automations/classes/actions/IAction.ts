import { ISerializeable } from "../ISerializeable";

export type actionTypes = 'gpio_action' | 'watering_action';

export interface IAction extends ISerializeable {
  type: actionTypes;
  performAction(): void;
}

export class ActionJsonData {
  type: actionTypes;
  boardId?: string;
  pinId?: string;
  newState?: boolean;
}