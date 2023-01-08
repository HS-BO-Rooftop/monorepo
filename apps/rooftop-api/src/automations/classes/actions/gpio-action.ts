import { Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { actionTypes, IAction } from './IAction';

export class GpioAction implements IAction {
  private logger: Logger;
  public type: actionTypes = 'gpio_action';

  constructor(
    private boardId: string,
    private pinName: string,
    private targetState: boolean,
    private mqtt: ClientProxy
  ) {
    this.logger = new Logger(`GPIO Action: Board ${boardId} / Pin ${pinName}`);
  }

  public performAction() {
    this.logger.verbose(`Setting pin to ${this.targetState ? 'HIGH' : 'LOW'}`);
    this.mqtt
      .emit(`boards/${this.boardId}/pins/${this.pinName}/state`, this.targetState)
      .subscribe();
  }

  serialize(): string {
    return JSON.stringify({
      boardId: this.boardId,
      pinId: this.pinName,
      newState: this.targetState,
      type: this.type,
    });
  }
}
