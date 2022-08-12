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
import { FindByUUIDDto } from '../../common/dto/find-by-uuid.dto';
import { RBadRequestResponse } from '../../common/responses/BadRequestResponse.dto';
import { RInternalServerErrorResponse } from '../../common/responses/InternalServierErrorResponse.dto';
import { RNotFoundResponse } from '../../common/responses/NotFoundResponse.dto';
import { CreateSensorTypeDto } from './dto/create-sensor-type.dto';
import { SensorTypeDto } from './dto/sensory-type.dto';
import { UpdateSensorTypeDto } from './dto/update-sensor-type.dto';
import { SensorTypesService } from './sensor-types.service';

@Controller('sensor-types')
@ApiTags('Sensors', 'Sensor Types')
@RBadRequestResponse()
@RInternalServerErrorResponse()
export class SensorTypesController {
  constructor(private readonly sensorTypesService: SensorTypesService) {}

  @Post()
  @ApiCreatedResponse({ type: SensorTypeDto })
  create(@Body() createSensorTypeDto: CreateSensorTypeDto) {
    return this.sensorTypesService.create(createSensorTypeDto);
  }

  @Get()
  @ApiOkResponse({
    type: [SensorTypeDto],
  })
  findAll() {
    return this.sensorTypesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: SensorTypeDto })
  @RNotFoundResponse()
  findOne(@Param() params: FindByUUIDDto) {
    return this.sensorTypesService.findOne(params.id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: SensorTypeDto })
  @RNotFoundResponse()
  update(
    @Param() params: FindByUUIDDto,
    @Body() updateSensorTypeDto: UpdateSensorTypeDto
  ) {
    return this.sensorTypesService.update(params.id, updateSensorTypeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Sensor Type was deleted successfully',
  })
  @RNotFoundResponse()
  remove(@Param('id') id: string) {
    return this.sensorTypesService.remove(id);
  }
}
