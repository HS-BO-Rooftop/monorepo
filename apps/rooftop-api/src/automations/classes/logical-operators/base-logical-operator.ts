import { BehaviorSubject } from 'rxjs';
import { evaluatorType, IEvaluator } from '../IEvaluator';

export type logicalOperators = 'and' | 'or' | 'not';

export abstract class BaseLogicalOperator implements IEvaluator {
  public operator: logicalOperators;
  public conditions: IEvaluator[];
  abstract isFullfilled: BehaviorSubject<boolean>

  constructor(conditions: IEvaluator[]) {
    this.conditions = conditions;
  }
  type: evaluatorType;

  serialize(): string {
    return JSON.stringify({
      operator: this.operator,
      conditions: this.conditions.map(cond => cond.serialize()),
    });
  }
}
