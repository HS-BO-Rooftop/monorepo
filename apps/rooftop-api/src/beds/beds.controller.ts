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
import { RInternalServerErrorResponse } from '../common/responses/InternalServierErrorResponse.dto';
import { RNotFoundResponse } from '../common/responses/NotFoundResponse.dto';
import { BedsService } from './beds.service';
import { BedDto } from './dto/bed.dto';
import { CreateBedDto } from './dto/create-bed.dto';
import { UpdateBedDto } from './dto/update-bed.dto';

@Controller('beds')
@ApiTags('Beds')
@RInternalServerErrorResponse()
export class BedsController {
  constructor(private readonly bedsService: BedsService) {}

  @Post()
  @ApiCreatedResponse({
    type: BedDto,
  })
  @ApiOperation({
    operationId: 'createBed',
  })
  create(@Body() createBedDto: CreateBedDto) {
    return this.bedsService.create(createBedDto);
  }

  @Get()
  @ApiOkResponse({
    type: BedDto,
    isArray: true,
  })
  @ApiOperation({
    operationId: 'findBeds',
  })
  findAll() {
    return this.bedsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: BedDto,
  })
  @RNotFoundResponse()
  @ApiOperation({
    operationId: 'findBed',
  })
  findOne(@Param('id') id: string) {
    return this.bedsService.findOne(id);
  }

  @Patch(':id')
  @RNotFoundResponse()
  @ApiOkResponse({
    type: BedDto,
  })
  @ApiOperation({
    operationId: 'updateBed',
  })
  update(@Param('id') id: string, @Body() updateBedDto: UpdateBedDto) {
    return this.bedsService.update(id, updateBedDto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @ApiOperation({
    operationId: 'deleteBed',
  })
  remove(@Param('id') id: string) {
    return this.bedsService.remove(id);
  }
}
