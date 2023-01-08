import { BaseOperatorEvaluator } from './base-operator-evaluator';

export abstract class ComparisonEvaluator<T> extends BaseOperatorEvaluator<T> {
  public targetValue: T;

  public evaluate(data: T): boolean {
    return this.evaluateValues(data, this.targetValue);
  }

  evaluateValues(left: T, right: T): boolean {
    if (this.operator === 'eq') {
      return left === right;
    } else if (this.operator === 'neq') {
      return left !== right;
    } else if (this.operator === 'gt') {
      return left > right;
    } else if (this.operator === 'gte') {
      return left >= right;
    } else if (this.operator === 'lt') {
      return left < right;
    } else if (this.operator === 'lte') {
      return left <= right;
    }
  }
}
