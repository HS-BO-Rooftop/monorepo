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
import { BoardConfigurationDto } from './boards/dto/board-configuration.dto';
import { ConfigurationsService } from './configurations.service';
import { CreateBoardSensorDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';

@Controller('configurations')
@ApiTags('Configurations', 'Boards')
@RInternalServerErrorResponse()
@RBadRequestResponse()
export class ConfigurationsController {
  constructor(private readonly configurationsService: ConfigurationsService) {}

  @Post()
  @ApiCreatedResponse({
    type: BoardConfigurationDto,
  })
  create(@Body() createConfigurationDto: CreateBoardSensorDto) {
    return this.configurationsService.create(createConfigurationDto);
  }

  @Get()
  @ApiOkResponse({
    type: BoardConfigurationDto,
    isArray: true,
  })
  findAll() {
    return this.configurationsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: BoardConfigurationDto,
  })
  @RNotFoundResponse()
  findOne(@Param() params: FindByUUIDDto) {
    return this.configurationsService.findOne(params.id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: BoardConfigurationDto,
  })
  @RNotFoundResponse()
  update(
    @Param() params: FindByUUIDDto,
    @Body() updateConfigurationDto: UpdateConfigurationDto
  ) {
    return this.configurationsService.update(params.id, updateConfigurationDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RNotFoundResponse()
  @ApiNoContentResponse({
    description: 'Board sensor deleted',
  })
  remove(@Param() params: FindByUUIDDto) {
    return this.configurationsService.remove(params.id);
  }
}
