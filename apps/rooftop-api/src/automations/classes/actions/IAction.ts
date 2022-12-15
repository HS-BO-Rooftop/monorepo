import { ISerializeable } from "../ISerializeable";

export type actionTypes = 'gpio_action' | 'watering_action';

export interface IAction extends ISerializeable {
  type: actionTypes;
  performAction(): void;
}
