import { BehaviorSubject, combineLatest } from 'rxjs';
import { IEvaluator } from '../IEvaluator';
import { BaseLogicalOperator } from './base-logical-operator';

/**
 * OrLogicalOperator
 * @description
 * This class is used to evaluate a list of conditions using the OR operator.
 */
export class OrLogicalOperator extends BaseLogicalOperator {
  public operator: 'or';
  public conditions: IEvaluator[];
  public isFullfilled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(conditions: IEvaluator[]) {
    super(conditions);
    combineLatest(
      this.conditions.map(cond => cond.isFullfilled)
    )
    .subscribe((results: boolean[]) => {
      const isFullfilled = results.some(result => result);
      this.isFullfilled.next(isFullfilled);
    });
  }

  serialize(): string {
    return JSON.stringify({
      operator: this.operator,
      type: this.type,
      conditions: this.conditions.map(cond => cond.serialize()),
    });
  }
}
