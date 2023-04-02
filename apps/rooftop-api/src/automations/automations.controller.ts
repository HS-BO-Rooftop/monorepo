import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext } from '@nestjs/microservices';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { RNotFoundResponse } from '../common/responses/NotFoundResponse.dto';
import { AutomationsService } from './automations.service';
import { AutomationConfigDto } from './classes/automation-config';
import { AutomationUpdateResponseDto } from './dto/automation-update-response.dto';
import { MQTTCacheService } from './mqtt-cache.service';

@Controller('automations')
@ApiTags('Automations')
export class AutomationsController {
  constructor(
    private readonly service: AutomationsService,
    private readonly cacheService: MQTTCacheService
  ) {}

  @MessagePattern('boards/+/sensors/+/value')
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
  @ApiOperation({
    summary: 'Get all automations',
    operationId: 'getAutomations',
  })
  @ApiOkResponse({
    description: 'Returns all automations',
    type: AutomationConfigDto,
    isArray: true,
  })
  getAutomations() {
    return this.service.getAutomations();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific automation',
    operationId: 'getAutomation',
  })
  @ApiOkResponse({
    description: 'Returns the requested automation',
    type: AutomationConfigDto,
  })
  getAutomation(@Param('id') id: string) {
    return this.service.getAutomation(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Creates a new automation',
    operationId: 'createAutomation',
  })
  @ApiCreatedResponse({
    description: 'Creates a new automation',
    type: AutomationUpdateResponseDto,
  })
  createAutomation(@Body() data: AutomationConfigDto) {
    return this.service.createAutomation(data);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Updates an automation',
    operationId: 'updateAutomation',
  })
  @ApiOkResponse({
    description: 'Returns the updated automation',
    type: AutomationUpdateResponseDto,
  })
  @RNotFoundResponse()
  updateAutomation(
    @Body() data: AutomationConfigDto,
    @Param('id') id: string
  ) {
    return this.service.updateAutomation(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deletes an automation',
    operationId: 'deleteAutomation',
  })
  @ApiNoContentResponse({
    description: 'Successfully deleted automation',
  })
  deleteAutomation(@Param('id') id: string) {
    return this.service.deleteAutomation(id);
  }
}
