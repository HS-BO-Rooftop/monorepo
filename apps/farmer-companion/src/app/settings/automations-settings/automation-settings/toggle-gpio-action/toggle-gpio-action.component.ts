import { Component, Input } from '@angular/core';
import { BoardDto, BoardPinDto } from '../../../../api/models';
import { BaseAutomationAction } from '../base-automation-condition';

@Component({
  selector: 'rooftop-toggle-gpio-action',
  templateUrl: './toggle-gpio-action.component.html',
  styleUrls: ['./toggle-gpio-action.component.scss'],
})
export class ToggleGpioActionComponent extends BaseAutomationAction {
  public targetValue = false;
  @Input() public boards: BoardDto[] = [];
  @Input() public pins: BoardPinDto[] = [];

  public selectedBoard: BoardDto | undefined;
  public selectedPin: BoardPinDto | undefined;

  public override toJson() {
    if (!this.selectedBoard || !this.selectedPin) {
      throw new Error('Board and pin must be selected');
    }

    return {
      type: 'gpio_action',
      newState: this.targetValue,
      boardId: this.selectedBoard.id,
      pinId: this.selectedPin.pin,
    };
  }
}
