import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
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
  @ApiProperty()
  type: evaluatorType;

  @ApiPropertyOptional()
  lookaheadminutes?: number;

  @ApiPropertyOptional()
  operator?: comparisonOperators | logicalOperators;

  @ApiPropertyOptional()
  condition?: EvaluatorJsonData;

  @ApiPropertyOptional()
  conditions?: EvaluatorJsonData[];

  @ApiPropertyOptional()
  sensorId?: string;

  @ApiPropertyOptional()
  target?: any;

  @ApiPropertyOptional()
  hours?: number;

  @ApiPropertyOptional()
  minutes?: number;
}
