import { timer } from 'rxjs';
import {
  BaseOperatorEvaluator,
  comparisonOperators
} from '../base-operator-evaluator';
import { evaluatorType } from '../IEvaluator';
import { ISerializeable } from '../ISerializeable';

export class TimeCondition
  extends BaseOperatorEvaluator<Date>
  implements ISerializeable
{
  public type: evaluatorType = 'time';

  constructor(public operator: comparisonOperators, public target: Date) {
    super(operator);

    // Run every 10s
    timer(0, 10000).subscribe(() => {
      const res = this.evaluate(new Date());
      this.isFullfilled.next(res);
    });
  }

  public evaluate(data: Date): boolean {
    const currentHours = data.getHours();
    const currentMinutes = data.getMinutes();
    const hours = this.target.getHours();
    const minutes = this.target.getMinutes();

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
      target: this.target,
      type: this.type,
    });
  }
}
