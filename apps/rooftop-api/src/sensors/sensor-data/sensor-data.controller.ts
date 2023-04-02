import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { RInternalServerErrorResponse } from '../../common/responses/InternalServierErrorResponse.dto';
import { CreateSensorDataRequestDto } from './dto/create';
import { SensorDataService } from './sensor-data.service';

@Controller('sensors/data')
@ApiTags('Data')
@RInternalServerErrorResponse()
export class SensorDataController {
  constructor(private readonly sensorDataService: SensorDataService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse()
  async create(
    @Body()
    data: CreateSensorDataRequestDto
  ) {
    return this.sensorDataService.create(data);
  }
}
