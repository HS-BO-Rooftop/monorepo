import { BehaviorSubject } from "rxjs";
import { comparisonOperators } from "./base-operator-evaluator";
import { ISerializeable } from "./ISerializeable";
import { logicalOperators } from "./logical-operators/base-logical-operator";


export type evaluatorType =
  | 'and'
  | 'or'
  | 'not'
  | 'sensor'
  | 'time'
  | 'weather'
  | 'time_since_last_run';

export interface IEvaluator extends ISerializeable {
  type: evaluatorType;
  isFullfilled: BehaviorSubject<boolean>;
}

export class EvaluatorJsonData {
  type: evaluatorType;
  operator?: comparisonOperators | logicalOperators;
  condition?: EvaluatorJsonData;
  conditions?: EvaluatorJsonData[];
  sensorId?: string;
  target?: any;
  hours?: number;
  minutes?: number;
}
