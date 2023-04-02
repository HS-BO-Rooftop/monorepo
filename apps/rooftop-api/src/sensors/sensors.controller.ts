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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: SensorConfigurationDto })
  create(@Body() createSensorDto: CreateSensorConfigurationDto) {
    return this.sensorsService.create(createSensorDto);
  }

  @Get()
  @ApiOkResponse({ type: SensorConfigurationDto, isArray: true })
  @ApiOperation({
    operationId: 'findAllSensors',
  })
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: SensorConfigurationDto })
  @RNotFoundResponse()
  update(
    @Param() params: FindByUUIDDto,
    @Body() updateSensorDto: UpdateSensorDto
  ) {
    return this.sensorsService.update(params.id, updateSensorDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiNoContentResponse()
  @RNotFoundResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() params: FindByUUIDDto) {
    return this.sensorsService.remove(params.id);
  }
}
