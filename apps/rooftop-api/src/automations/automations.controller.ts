import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext } from '@nestjs/microservices';
import { AutomationsService } from './automations.service';
import { AutomationConfigDto } from './classes/automation-config';
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

  @Get()
  async getAutomations() {
    return this.service.getAutomations();
  }

  @Get(':id')
  async getAutomation(id: string) {
    return this.service.getAutomation(id);
  }

  @Post()
  async createAutomation(@Body() data: AutomationConfigDto) {
    return this.service.createAutomation(data);
  }

  @Patch(':id')
  async updateAutomation(@Body() data: AutomationConfigDto, @Param('id') id: string) {
    return this.service.updateAutomation(id, data);
  }

  @Delete(':id')
  async deleteAutomation(@Param('id') id: string) {
    return this.service.deleteAutomation(id);
  }
}
