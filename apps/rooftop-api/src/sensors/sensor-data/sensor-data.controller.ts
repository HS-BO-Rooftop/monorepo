import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { RInternalServerErrorResponse } from '../../common/responses/InternalServierErrorResponse.dto';
import { CreateSensorDataRequestDto } from './dto/create';
import { SensorDataService } from './sensor-data.service';

@Controller('sensors/data')
@ApiTags('Data')
@RInternalServerErrorResponse()
export class SensorDataController {
  constructor(private readonly sensorDataService: SensorDataService) {}

  @Post()
  @ApiCreatedResponse()
  async create(
    @Body()
    data: CreateSensorDataRequestDto
  ) {
    console.log('data', data);
    return this.sensorDataService.create(data);
  }
}
