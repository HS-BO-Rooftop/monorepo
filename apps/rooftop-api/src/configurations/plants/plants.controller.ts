import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RInternalServerErrorResponse } from '../../common/responses/InternalServierErrorResponse.dto';
import { RNotFoundResponse } from '../../common/responses/NotFoundResponse.dto';
import { CreatePlantDto } from './dto/create-plant.dto';
import { PlantDto } from './dto/plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { PlantsService } from './plants.service';

@Controller('plants')
@ApiTags('Plants')
@RInternalServerErrorResponse()
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Post()
  @ApiCreatedResponse({
    type: PlantDto,
  })
  @ApiOperation({
    operationId: 'createPlant',
  })
  create(@Body() createPlantDto: CreatePlantDto) {
    return this.plantsService.create(createPlantDto);
  }

  @Get()
  @ApiOkResponse({
    type: PlantDto,
    isArray: true,
  })
  @ApiOperation({
    operationId: 'findAllPlants',
  })
  findAll() {
    return this.plantsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: PlantDto,
  })
  @RNotFoundResponse()
  @ApiOperation({
    operationId: 'findPlantById',
  })
  findOne(@Param('id') id: string) {
    return this.plantsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: PlantDto,
  })
  @RNotFoundResponse()
  @ApiOperation({
    operationId: 'updatePlant',
  })
  update(@Param('id') id: string, @Body() updatePlantDto: UpdatePlantDto) {
    return this.plantsService.update(id, updatePlantDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({
    description: 'Plant deleted successfully',
  })
  @ApiOperation({
    operationId: 'deletePlant',
  })
  remove(@Param('id') id: string) {
    return this.plantsService.remove(id);
  }
}
