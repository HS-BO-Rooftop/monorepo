import { Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { actionTypes, IAction } from "./IAction";

export class WateringAction implements IAction {
  private logger: Logger;
  public type: actionTypes = 'gpio';

  constructor(private action: boolean,private readonly mqtt: ClientProxy) {
    this.logger = new Logger('WateringAction');
  }
  serialize(): string {
    throw new Error("Method not implemented.");
  }

  public performAction(): void {
    this.logger.log(`Watering action: ${this.action}`);
    this.mqtt.emit('watering', this.action).subscribe();
  }
}