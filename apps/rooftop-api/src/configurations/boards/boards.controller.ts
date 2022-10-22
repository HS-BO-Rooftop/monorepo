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
  Query,
  Sse,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { filter, Observable, Subject } from 'rxjs';
import { FindByUUIDDto } from '../../common/dto/find-by-uuid.dto';
import { BoardConfigurationUpdatedEvent } from '../../common/events/board-configuration-updated.event';
import { RBadRequestResponse } from '../../common/responses/BadRequestResponse.dto';
import { RInternalServerErrorResponse } from '../../common/responses/InternalServierErrorResponse.dto';
import { RNotFoundResponse } from '../../common/responses/NotFoundResponse.dto';
import { ConfigurationsService } from '../configurations.service';
import { QueryConfigurationsDto } from '../dto/query-configurations.dto';
import { BoardsService } from './boards.service';
import { BoardConfigurationDto } from './dto/board-configuration.dto';
import { BoardDto } from './dto/board.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
@ApiTags('Boards')
@RInternalServerErrorResponse()
@RBadRequestResponse()
export class BoardsController {
  private $_configurationChangedEvent = new Subject<string>();

  constructor(
    private readonly boardsService: BoardsService,
    private readonly configurationsService: ConfigurationsService
  ) {}

  @OnEvent(BoardConfigurationUpdatedEvent.eventName)
  onConfigurationChangedEvent(payload: BoardConfigurationUpdatedEvent) {
    this.$_configurationChangedEvent.next(payload.boardId);
  }

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
  @ApiOperation({
    operationId: 'findAllBoards',
  })
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BoardDto })
  @RNotFoundResponse()
  @ApiOperation({
    operationId: 'findOneBoard',
  })
  findOne(@Param() params: FindByUUIDDto) {
    return this.boardsService.findOne(params.id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: BoardDto })
  @RNotFoundResponse()
  @ApiOperation({
    operationId: 'updateBoard',
  })
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

  @Get('/:id/configurations')
  @ApiOkResponse({
    type: BoardConfigurationDto,
    isArray: true,
  })
  @RNotFoundResponse()
  @ApiOperation({
    operationId: 'getConfigurationsForBoard',
  })
  async findAllConfigurations(
    @Param() params: FindByUUIDDto,
    @Query() query: QueryConfigurationsDto
  ) {
    await this.boardsService.findOne(params.id);
    return this.configurationsService.findAllByBoard(
      params.id,
      query.connectedOnly
    );
  }

  @Sse(':id/configurations/updated')
  @ApiOkResponse({
    schema: {
      type: 'string',
      format: 'uuid',
      description: 'UUID of the board that was updated',
    },
  })
  @RNotFoundResponse()
  async getConfigurationChangedEvent(
    @Param() params: FindByUUIDDto
  ): Promise<Observable<unknown>> {
    await this.boardsService.findOne(params.id);
    return this.$_configurationChangedEvent
      .asObservable()
      .pipe(filter((id) => id === params.id));
  }
}
