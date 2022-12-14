import { filter, map, Observable } from 'rxjs';
import { mqttCacheEntry } from '../../mqtt-cache.service';
import { comparisonOperators } from '../base-operator-evaluator';
import { ComparisonEvaluator } from '../comparison-evaluator';
import { evaluatorType } from '../IEvaluator';
import { ISerializeable } from '../ISerializeable';

export class SensorValueCondition<T> extends ComparisonEvaluator<T> implements ISerializeable {
  public type: evaluatorType = 'sensor';
  public targetValue: T;

  private _previousValue: T;

  constructor(
    public sensorId: string,
    public operator: comparisonOperators,
    targetValue: T,
    mqttCache: Observable<mqttCacheEntry[]>
  ) {
    super(operator);
    this.targetValue = targetValue;
    mqttCache
      .pipe(
        map((cache) => {
          const entry = cache.find((entry) => entry.sensorId === sensorId);
          if (!entry) return null;
          return entry;
        }),
        filter((entry) => entry !== null),
        filter((entry) => {
          const previousValue = this._previousValue;
          this._previousValue = entry.data;
          return previousValue !== entry.data;
        })
      )
      .subscribe((entry) => {
        console.log('Entry', entry);
        const res = this.evaluate(entry.data);
        console.log('Res', res);
        this.isFullfilled.next(res);
      });
  }

  serialize(): string {
    return JSON.stringify({
      sensorId: this.sensorId,
      operator: this.operator,
      targetValue: this.targetValue,
      type: this.type
    });
  }
}
