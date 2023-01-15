import { Component, Input } from '@angular/core';
import { BoardDto, BoardPinDto } from '../../../../api/models';
import { BaseAutomationCondition } from '../base-automation-condition';

@Component({
  selector: 'rooftop-gpio-duration-action',
  templateUrl: './gpio-duration-action.component.html',
  styleUrls: ['./gpio-duration-action.component.scss'],
})
export class GpioDurationActionComponent extends BaseAutomationCondition {
  public targetValue = false;
  @Input() public boards: BoardDto[] = [];
  @Input() public pins: BoardPinDto[] = [];

  public selectedBoard: BoardDto | undefined;
  public selectedPin: BoardPinDto | undefined;
  public duration: number | undefined;

  public override toJson() {
    const json = {
      type: 'gpio-duration',
      newState: this.targetValue,
      boardId: this.selectedBoard?.id,
      pinId: this.selectedPin?.pin,
      duration: this.duration,
    };

    console.log(json);

    return json;
  }
}
