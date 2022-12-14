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
    public hours: number,
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
    const currentHours = new Date().getHours();
    const currentMinutes = new Date().getMinutes();
    const hours = lastRun.getHours();
    const minutes = lastRun.getMinutes();

    if (this.operator === 'eq') {
      return currentHours === hours && currentMinutes === minutes;
    }
    if (this.operator === 'neq') {
      return currentHours !== hours || currentMinutes !== minutes;
    }
    if (this.operator === 'gt') {
      return currentHours > hours || currentMinutes > minutes;
    }
    if (this.operator === 'gte') {
      return currentHours >= hours || currentMinutes >= minutes;
    }
    if (this.operator === 'lt') {
      return currentHours < hours || currentMinutes < minutes;
    }
    if (this.operator === 'lte') {
      return currentHours <= hours || currentMinutes <= minutes;
    }
  }

  serialize(): string {
    return JSON.stringify({
      operator: this.operator,
      hours: this.hours,
      minutes: this.minutes,
      type: this.type,
    });
  }
}
