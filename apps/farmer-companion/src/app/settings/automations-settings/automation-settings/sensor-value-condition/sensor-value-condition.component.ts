import { Component } from '@angular/core';
import { BoardConfigurationDto, BoardDto } from '../../../../api/models';
import { operators } from '../../../../common/operators/comparison-operators';
import { BaseAutomationCondition } from '../base-automation-condition';

@Component({
  selector: 'rooftop-sensor-value-condition',
  templateUrl: './sensor-value-condition.component.html',
  styleUrls: ['./sensor-value-condition.component.scss'],
})
export class SensorValueConditionComponent extends BaseAutomationCondition {
  boards: BoardDto[] = [];
  sensors: BoardConfigurationDto[] = [];

  filteredSensors: BoardConfigurationDto[] = [];

  selectedBoard: BoardDto | null = null;
  selectedSensor: BoardConfigurationDto | null = null;
  selectedOperator: string | null = null;
  selectedValue: number | null = null;

  public readonly operators = operators;

  onBoardChange(board: BoardDto) {
    this.selectedBoard = board;
    // Filter the sensors to only show the ones that are on the selected board
    this.filteredSensors = this.sensors.filter((sensor) => sensor.board.id === board.id);
  }

  public override toJson() {
    if (!this.selectedSensor || !this.selectedOperator || !this.selectedValue) {
      throw new Error('No value selected');
    }
    return {
      type: 'sensor',
      sensorId: this.selectedSensor.id,
      operator: this.selectedOperator,
      target: this.selectedValue,
    };
  }
}
