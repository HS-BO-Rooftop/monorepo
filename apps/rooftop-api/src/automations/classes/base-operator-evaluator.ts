import { BehaviorSubject } from 'rxjs';
import { evaluatorType, IEvaluator } from './IEvaluator';

export type comparisonOperators = 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte';

export abstract class BaseOperatorEvaluator<T> implements IEvaluator {
  public abstract type: evaluatorType;
  protected operator: comparisonOperators;
  public abstract evaluate(data: T): boolean;
  isFullfilled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(operator: comparisonOperators) {
    this.operator = operator;
  }

  public serialize(): string {
    return JSON.stringify({
      type: this.type,
      operator: this.operator,
    });
  }
}
