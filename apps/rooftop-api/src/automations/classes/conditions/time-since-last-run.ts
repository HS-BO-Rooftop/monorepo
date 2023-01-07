import { combineLatest, Observable, timer } from 'rxjs';
import {
  BaseOperatorEvaluator,
  comparisonOperators
} from '../base-operator-evaluator';
import { evaluatorType } from '../IEvaluator';
import { ISerializeable } from '../ISerializeable';

export class TimeSinceLastRunCondition extends BaseOperatorEvaluator<Date> implements ISerializeable {
  public type: evaluatorType = 'time_since_last_run';

  constructor(
    public operator: comparisonOperators,
    public minutes: number,
    public lastRunObs: Observable<Date>
  ) {
    super(operator);
    // Check every 10s or when the lastRunObs emits
    combineLatest([
      timer(0, 10000),
      this.lastRunObs
    ])
    .subscribe(([_, lastRun]) => {
      const isFullfilled = this.evaluate(lastRun);
      this.isFullfilled.next(isFullfilled);
    });
  }

  public evaluate(lastRun: Date): boolean {
    const now = new Date();
    const diff = now.getTime() - lastRun.getTime();
    const minutes = Math.floor(diff / 1000 / 60);
    return this.compare(minutes, this.minutes);
  }

  public compare(a: number, b: number): boolean {
    switch (this.operator) {
      case 'eq':
        return a === b;
      case 'neq':
        return a !== b;
      case 'gt':
        return a > b;
      case 'gte':
        return a >= b;
      case 'lt':
        return a < b;
      case 'lte':
        return a <= b;
    }
  }

  serialize(): string {
    return JSON.stringify({
      operator: this.operator,
      target: this.minutes,
      type: this.type,
    });
  }
}
