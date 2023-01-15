import { Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { actionTypes, IAction } from "./IAction";

export class WateringAction implements IAction {
  private logger: Logger;
  public type: actionTypes = 'gpio_action';

  constructor(private targetState: boolean,private readonly mqtt: ClientProxy) {
    this.logger = new Logger('WateringAction');
  }


  serialize(): string {
    return JSON.stringify({
      newState: this.targetState,
      type: this.type,
    });
  }

  dispose(): void {
    // Nothing to dispose
  }

  public performAction(): void {
    this.logger.log(`Watering action: ${this.targetState}`);
    this.mqtt.emit('watering', this.targetState).subscribe();
  }
}