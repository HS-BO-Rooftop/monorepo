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
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindByUUIDDto } from '../../common/dto/find-by-uuid.dto';
import { RBadRequestResponse } from '../../common/responses/BadRequestResponse.dto';
import { RInternalServerErrorResponse } from '../../common/responses/InternalServierErrorResponse.dto';
import { RNotFoundResponse } from '../../common/responses/NotFoundResponse.dto';
import { CreateSensorInterfaceDto } from './dto/create-sensor-interface.dto';
import { SensorInterfaceDto } from './dto/sensor-interface.dto';
import { UpdateSensorInterfaceDto } from './dto/update-sensor-interface.dto';
import { SensorInterfacesService } from './sensor-interfaces.service';

@Controller('sensor-interfaces')
@ApiTags('Sensors', 'Configuration', 'Sensor Interfaces')
@RInternalServerErrorResponse()
@RBadRequestResponse()
export class SensorInterfacesController {
  constructor(
    private readonly sensorInterfacesService: SensorInterfacesService
  ) {}

  @Post()
  @ApiOkResponse({
    type: SensorInterfaceDto,
    description: 'The created sensor interface',
  })
  create(@Body() createSensorInterfaceDto: CreateSensorInterfaceDto) {
    return this.sensorInterfacesService.create(createSensorInterfaceDto);
  }

  @Get()
  @ApiOkResponse({ type: [SensorInterfaceDto] })
  findAll() {
    return this.sensorInterfacesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: SensorInterfaceDto })
  findOne(@Param() params: FindByUUIDDto) {
    return this.sensorInterfacesService.findOne(params.id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: SensorInterfaceDto })
  update(
    @Param() params: FindByUUIDDto,
    @Body() updateSensorInterfaceDto: UpdateSensorInterfaceDto
  ) {
    return this.sensorInterfacesService.update(
      params.id,
      updateSensorInterfaceDto
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Successfully deleted sensor interface',
  })
  @RNotFoundResponse()
  remove(@Param() params: FindByUUIDDto) {
    return this.sensorInterfacesService.remove(params.id);
  }
}
