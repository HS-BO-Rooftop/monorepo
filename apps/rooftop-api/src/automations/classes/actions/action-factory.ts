import { ClientProxy } from "@nestjs/microservices";
import { GpioAction } from "./gpio-action";
import { ActionJsonData, IAction } from "./IAction";
import { WateringAction } from "./watering-action";

export class ActionFactory {
  public static deserialize(data: ActionJsonData, mqtt: ClientProxy): IAction {
    switch (data.type) {
      case 'gpio_action':
        return new GpioAction(data.boardId, data.pinId, data.newState, mqtt);
      case 'watering_action':
        return new WateringAction(data.newState, mqtt);
      default:
        throw new Error(`Unknown action type: ${data.type}`);
    }
  }
}