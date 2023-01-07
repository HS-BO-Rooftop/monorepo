import { Component } from '@angular/core';
import { BaseAutomationCondition } from '../base-automation-condition';

@Component({
  selector: 'rooftop-weather-forecast-value-condition',
  templateUrl: './weather-forecast-value-condition.component.html',
  styleUrls: ['./weather-forecast-value-condition.component.scss'],
})
export class WeatherForecastValueConditionComponent extends BaseAutomationCondition{
  public isRainy = false;
  public duration = 0;

  public override toJson() {
    return {
      type: 'weather',
      target: this.isRainy ? 'rain' : 'sun',
      lookaheadminutes: this.duration,
    };
  }
}
