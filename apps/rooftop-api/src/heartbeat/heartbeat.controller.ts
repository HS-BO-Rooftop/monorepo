import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { RInternalServerErrorResponse } from '../common/responses/InternalServierErrorResponse.dto';
import { RNotFoundResponse } from '../common/responses/NotFoundResponse.dto';
import { HeartbeatRequestDto } from './dto/heartbeat-request.dto';
import { HeartbeatResponseDto } from './dto/heartbeat-response.dto';
import { HeartbeatService } from './heartbeat.service';

@Controller('heartbeat')
@ApiTags('Heartbeat', 'Boards')
export class HeartbeatController {
  constructor(private readonly service: HeartbeatService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: HeartbeatResponseDto,
  })
  @RNotFoundResponse()
  @RInternalServerErrorResponse()
  async heartbeat(@Body() body: HeartbeatRequestDto) {
    await this.service.updateLastSeenAt(body.id);
    return {
      timestamp: Math.floor(new Date().getTime() / 1000),
    };
  }
}
