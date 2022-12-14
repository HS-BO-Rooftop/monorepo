import { BehaviorSubject } from "rxjs";
import { ISerializeable } from "./ISerializeable";

export type evaluatorType =
  | 'and'
  | 'or'
  | 'not'
  | 'sensor'
  | 'time'
  | 'water_level'
  | 'weather'
  | 'time_since_last_run';

export interface IEvaluator extends ISerializeable {
  type: evaluatorType;
  isFullfilled: BehaviorSubject<boolean>;
}
