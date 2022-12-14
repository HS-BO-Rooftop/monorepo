import { BehaviorSubject, combineLatest } from 'rxjs';
import { IEvaluator } from '../IEvaluator';
import { ISerializeable } from '../ISerializeable';
import { BaseLogicalOperator, logicalOperators } from './base-logical-operator';

/**
 * AndLogicalOperator
 * @description
 * This class is used to evaluate a list of conditions using the AND operator.
 */
export class AndLogicalOperator extends BaseLogicalOperator implements ISerializeable {
  public operator: logicalOperators = 'and';
  public conditions: IEvaluator[];
  public isFullfilled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(conditions: IEvaluator[]) {
    super(conditions);
    combineLatest(
      this.conditions.map(cond => cond.isFullfilled)
    )
    .subscribe((results: boolean[]) => {
      const isFullfilled = results.every(result => result);
      this.isFullfilled.next(isFullfilled);
    });
  }

  serialize(): string {
    return JSON.stringify({
      operator: this.operator,
      conditions: this.conditions.map(cond => cond.serialize()),
    });
  }
}
