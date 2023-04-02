import {
  Body,
  Controller,
  Delete,
  Get,
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
import { AuthGuard } from '../../auth/auth.guard';
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
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
