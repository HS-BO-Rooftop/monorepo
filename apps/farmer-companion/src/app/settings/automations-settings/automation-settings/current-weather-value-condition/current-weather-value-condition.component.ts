import { Component } from '@angular/core';
import { BaseAutomationCondition } from '../base-automation-condition';

@Component({
  selector: 'rooftop-current-weather-value-condition',
  templateUrl: './current-weather-value-condition.component.html',
  styleUrls: ['./current-weather-value-condition.component.scss'],
})
export class CurrentWeatherValueConditionComponent extends BaseAutomationCondition {
  public isRainy = false;

  /**
   * 
   */
  public override toJson() {
    return {
      type: 'weather',
      target: this.isRainy ? 'rain' : 'sun',
    };
  }
}
