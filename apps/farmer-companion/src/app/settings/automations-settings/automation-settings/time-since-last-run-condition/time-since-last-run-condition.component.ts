import { Component } from '@angular/core';
import { operators } from '../../../../common/operators/comparison-operators';
import { BaseAutomationCondition } from '../base-automation-condition';

@Component({
  selector: 'rooftop-time-since-last-run-condition',
  templateUrl: './time-since-last-run-condition.component.html',
  styleUrls: ['./time-since-last-run-condition.component.scss'],
})
export class TimeSinceLastRunConditionComponent extends BaseAutomationCondition {
  isTrigger = false;
  // Remove the neq operator from the list of operators
  readonly operators = operators.filter((operator) => operator.value !== 'neq');
  selectedOperator = this.operators[0].value;
  selectedValue: number | null = null;

  public override toJson() {
    if (!this.selectedValue) {
      throw new Error('No value selected');
    }

    return {
      type: 'time_since_last_run',
      operator: this.selectedOperator,
      minutes: this.selectedValue,
    };
  }
}
