import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext } from '@nestjs/microservices';
import { AutomationsService } from './automations.service';
import { MQTTCacheService } from './mqtt-cache.service';

@Controller('automations')
export class AutomationsController {
  constructor(
    private readonly service: AutomationsService,
    private readonly cacheService: MQTTCacheService
  ) {}

  @MessagePattern('boards/+/sensors/+/data')
  async handleSensorData(@Ctx() context: MqttContext) {
    const packet = context.getPacket();
    const { sensorId, boardId } = this.parsePath(context);
    const data = JSON.parse(packet.payload.toString());
    this.cacheService.addSensorData({ sensorId, data, boardId });
  }

  private parsePath(context: MqttContext) {
    const path = context.getTopic();
    const splits = path.split('/');
    return {
      boardId: splits[1],
      sensorId: splits[3],
    };
  }
}
