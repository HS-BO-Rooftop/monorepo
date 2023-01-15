import { Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Subscription, timer } from 'rxjs';
import { actionTypes, IAction } from './IAction';

export class GpioDurationAction implements IAction {
  private logger: Logger;
  public type: actionTypes = 'gpio-duration';

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

  public get duration() {
    return this._duration;
  }

  private _timerSubscription?: Subscription;

  constructor(
    private _boardId: string,
    private _pinName: string,
    private _targetState: boolean,
    private _duration: number,
    private mqtt: ClientProxy
  ) {
    this.logger = new Logger(
      `GPIO Duration Action: Board ${_boardId} / Pin ${_pinName}`
    );
  }

  public performAction() {
    this.logger.verbose(
      `Setting pin to ${this._targetState ? 'HIGH' : 'LOW'} for ${
        this._duration
      }minutes`
    );

    this.mqtt
      .emit(
        `boards/${this._boardId}/pins/${this._pinName}/state`,
        this._targetState
      )
      .subscribe();

    if (!this._timerSubscription) {
      this._timerSubscription = timer(this._duration * 60 * 1000).subscribe(
        () => {
          console.log(this._targetState, this._boardId, this._pinName);

          this.logger.verbose(
            `Setting pin to ${this._targetState ? 'LOW' : 'HIGH'} after ${
              this._duration
            } minutes`
          );

          this.mqtt
            .emit(
              `boards/${this._boardId}/pins/${this._pinName}/state`,
              !this._targetState
            )
            .subscribe();

          this._timerSubscription?.unsubscribe();
          this._timerSubscription = undefined;
        }
      );
    } else {
      this.logger.debug('Timer subscription already exists');
    }
  }

  public dispose() {
    this._timerSubscription?.unsubscribe();
  }

  serialize(): string {
    return JSON.stringify({
      boardId: this._boardId,
      pinId: this._pinName,
      newState: this._targetState,
      type: this.type,
      duration: this._duration,
    });
  }
}
