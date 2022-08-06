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
import { ConfigurationsService } from '../configurations.service';
import { BoardsService } from './boards.service';
import { BoardConfigurationDto } from './dto/board-configuration.dto';
import { BoardDto } from './dto/board.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
@ApiTags('Boards', 'Configuration')
@RInternalServerErrorResponse()
@RBadRequestResponse()
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly configurationsService: ConfigurationsService
  ) {}

  @Post()
  @ApiCreatedResponse({ type: BoardDto })
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  @ApiOkResponse({
    type: BoardDto,
    isArray: true,
  })
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BoardDto })
  @RNotFoundResponse()
  findOne(@Param() params: FindByUUIDDto) {
    return this.boardsService.findOne(params.id);
  }

  @Get('/:id/configurations')
  @ApiOkResponse({
    type: BoardConfigurationDto,
    isArray: true,
  })
  @RNotFoundResponse()
  async findAllConfigurations(@Param() params: FindByUUIDDto) {
    await this.boardsService.findOne(params.id);
    return this.configurationsService.findAllByBoard(params.id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: BoardDto })
  @RNotFoundResponse()
  update(
    @Param() params: FindByUUIDDto,
    @Body() updateBoardDto: UpdateBoardDto
  ) {
    return this.boardsService.update(params.id, updateBoardDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RNotFoundResponse()
  @ApiNoContentResponse({ description: 'Board deleted' })
  remove(@Param() params: FindByUUIDDto) {
    return this.boardsService.remove(params.id);
  }
}
