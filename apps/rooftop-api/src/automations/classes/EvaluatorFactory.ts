import { Observable } from "rxjs";
import { WeatherService } from "../../weather/weather.service";
import { mqttCacheEntry } from "../mqtt-cache.service";
import { comparisonOperators } from "./base-operator-evaluator";
import { SensorValueCondition } from "./conditions/sensor-value";
import { TimeCondition } from "./conditions/time-condition";
import { TimeSinceLastRunCondition } from "./conditions/time-since-last-run";
import { WeatherCondition } from "./conditions/weather-condition";
import { EvaluatorJsonData, IEvaluator } from "./IEvaluator";
import { AndLogicalOperator } from "./logical-operators/and-operator";
import { NotLogicalOperator } from "./logical-operators/not-operator";
import { OrLogicalOperator } from "./logical-operators/or-operator";

export class EvaluatorFactory {
  public static deserialize(
    data: EvaluatorJsonData, 
    weatherService: WeatherService, 
    lastRunObs: Observable<Date>, 
    mqttCache: Observable<mqttCacheEntry[]>
    ): IEvaluator {
    switch (data.type) {
      case 'and':
        return new AndLogicalOperator(
          data.conditions.map((cond) => EvaluatorFactory.deserialize(cond, weatherService, lastRunObs, mqttCache))
        );
      case 'or':
        return new OrLogicalOperator(
          data.conditions.map((cond) => EvaluatorFactory.deserialize(cond, weatherService, lastRunObs, mqttCache))
        );
      case 'not':
        return new NotLogicalOperator(
          EvaluatorFactory.deserialize(data.condition, weatherService, lastRunObs, mqttCache)
        );
      case 'sensor':
        return new SensorValueCondition(
          data.sensorId,
          data.operator as comparisonOperators,
          data.target,
          mqttCache
        );
      case 'time':
        return new TimeCondition(
          data.operator as comparisonOperators,
          new Date(data.target),
        )
      case 'time_since_last_run':
        return new TimeSinceLastRunCondition(
          data.operator as comparisonOperators,
          data.minutes,
          lastRunObs
        );
      case 'weather':
        return new WeatherCondition(
          data.target,
          data.lookaheadminutes,
          weatherService
        );
      default:
        throw new Error(`Unknown evaluator type: ${data.type}`);
    }
  }
}