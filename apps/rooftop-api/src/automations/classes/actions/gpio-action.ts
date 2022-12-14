import { Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { actionTypes, IAction } from './IAction';

export class GpioAction implements IAction {
  private logger: Logger;
  public type: actionTypes = 'gpio';

  constructor(
    private boardId: string,
    private pinId: string,
    private newState: boolean,
    private mqtt: ClientProxy
  ) {
    this.logger = new Logger(`GPIO Action: ${boardId}/${pinId}`);
  }

  public performAction() {
    this.logger.debug(`Setting pin ${this.pinId} to ${this.newState}`);
    this.mqtt
      .emit(`boards/${this.boardId}/pins/${this.pinId}/state`, this.newState)
      .subscribe();
  }

  serialize(): string {
    return JSON.stringify({
      boardId: this.boardId,
      pinId: this.pinId,
      newState: this.newState,
      type: this.type,
    });
  }
}
