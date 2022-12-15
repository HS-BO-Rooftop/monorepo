import { ISerializeable } from "../ISerializeable";

export type actionTypes = 'gpio' | 'watering';

export interface IAction extends ISerializeable {
  type: actionTypes;
  performAction(): void;
}
