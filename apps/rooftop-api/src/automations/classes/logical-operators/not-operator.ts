import { BehaviorSubject } from 'rxjs';
import { evaluatorType, IEvaluator } from '../IEvaluator';
import { logicalOperators } from './base-logical-operator';

// Takes a single condition and returns the opposite of that condition
export class NotLogicalOperator implements IEvaluator {
  public operator: logicalOperators = 'not';
  public condition: IEvaluator;
  public isFullfilled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public type: evaluatorType = 'not';

  constructor(condition: IEvaluator) {
    this.condition.isFullfilled
      .subscribe((result: boolean) => {
        this.isFullfilled.next(!result);
      }
    );
  }

  serialize(): string {
    return JSON.stringify({
      operator: this.operator,
      condition: this.condition.serialize(),
    });
  }
}
