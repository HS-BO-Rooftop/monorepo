import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindByUUIDDto } from '../common/dto/find-by-uuid.dto';
import { RBadRequestResponse } from '../common/responses/BadRequestResponse.dto';
import { RInternalServerErrorResponse } from '../common/responses/InternalServierErrorResponse.dto';
import { RNotFoundResponse } from '../common/responses/NotFoundResponse.dto';
import { CreateSensorConfigurationDto } from './dto/create-sensor-configuration.dto';
import { SensorConfigurationDto } from './dto/sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { SensorsService } from './sensors.service';

@Controller('sensors')
@ApiTags('Sensors')
@RInternalServerErrorResponse()
@RBadRequestResponse()
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Post()
  @ApiCreatedResponse({ type: SensorConfigurationDto })
  create(@Body() createSensorDto: CreateSensorConfigurationDto) {
    return this.sensorsService.create(createSensorDto);
  }

  @Get()
  @ApiOkResponse({ type: SensorConfigurationDto, isArray: true })
  findAll() {
    return this.sensorsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: SensorConfigurationDto })
  @RNotFoundResponse()
  findOne(@Param() params: FindByUUIDDto) {
    return this.sensorsService.findOne(params.id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: SensorConfigurationDto })
  @RNotFoundResponse()
  update(
    @Param() params: FindByUUIDDto,
    @Body() updateSensorDto: UpdateSensorDto
  ) {
    return this.sensorsService.update(params.id, updateSensorDto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @RNotFoundResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() params: FindByUUIDDto) {
    return this.sensorsService.remove(params.id);
  }
}
