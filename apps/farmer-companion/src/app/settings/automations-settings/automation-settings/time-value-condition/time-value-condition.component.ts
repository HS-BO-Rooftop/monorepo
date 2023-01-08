import { Component } from '@angular/core';
import { operators } from '../../../../common/operators/comparison-operators';
import { BaseAutomationCondition } from '../base-automation-condition';

@Component({
  selector: 'rooftop-time-value-condition',
  templateUrl: './time-value-condition.component.html',
  styleUrls: ['./time-value-condition.component.scss'],
})
export class TimeValueConditionComponent extends BaseAutomationCondition {
  isTrigger = false;
  // Remove the neq operator from the list of operators
  readonly operators = operators.filter((operator) => operator.value !== 'neq');
  selectedOperator = this.operators[0].value;
  selectedValue: string | null = null;

  public override toJson() {
    if (!this.selectedValue) {
      throw new Error('No value selected');
    }

    const today = new Date();
    const time = this.selectedValue.split(':');
    today.setHours(Number(time[0]));
    today.setMinutes(Number(time[1]));
    today.setSeconds(0);
    today.setMilliseconds(0);


    return {
      type: 'time',
      operator: this.selectedOperator,
      target: today.getTime(),
    };
  }
}
