import { ISerializeable } from "../ISerializeable";

export type actionTypes = 'gpio';

export interface IAction extends ISerializeable {
  type: actionTypes;
  performAction(): void;
}
