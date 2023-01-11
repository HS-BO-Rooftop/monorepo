import { Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { actionTypes, IAction } from './IAction';

export class GpioAction implements IAction {
  private logger: Logger;
  public type: actionTypes = 'gpio_action';

  public get boardId() {
    return this._boardId;
  }

  public get pinName() {
    return this._pinName;
  }

  public get boardPinName() {
    return `${this._boardId}/${this._pinName}`;
  }
  
  public get targetState() {
    return this._targetState;
  }


  constructor(
    private _boardId: string,
    private _pinName: string,
    private _targetState: boolean,
    private mqtt: ClientProxy
  ) {
    this.logger = new Logger(`GPIO Action: Board ${_boardId} / Pin ${_pinName}`);
  }

  public performAction() {
    this.logger.verbose(`Setting pin to ${this._targetState ? 'HIGH' : 'LOW'}`);
    this.mqtt
      .emit(`boards/${this._boardId}/pins/${this._pinName}/state`, this._targetState)
      .subscribe();
  }

  serialize(): string {
    return JSON.stringify({
      boardId: this._boardId,
      pinId: this._pinName,
      newState: this._targetState,
      type: this.type,
    });
  }
}
