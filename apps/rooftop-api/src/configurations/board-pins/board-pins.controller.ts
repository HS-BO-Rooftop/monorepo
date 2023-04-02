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
import { AuthGuard } from '../../auth/auth.guard';
import { FindByUUIDDto } from '../../common/dto/find-by-uuid.dto';
import { RBadRequestResponse } from '../../common/responses/BadRequestResponse.dto';
import { RInternalServerErrorResponse } from '../../common/responses/InternalServierErrorResponse.dto';
import { RNotFoundResponse } from '../../common/responses/NotFoundResponse.dto';
import { BoardPinsService } from './board-pins.service';
import { BoardPinDto } from './dto/board-pin.dto';
import { CreateBoardPinDto } from './dto/create-board-pin.dto';
import { UpdateBoardPinDto } from './dto/update-board-pin.dto';

@Controller('board-pins')
@ApiTags('Boards', 'Board Pins', 'Configuration')
@RBadRequestResponse()
@RInternalServerErrorResponse()
export class BoardPinsController {
  constructor(private readonly boardPinsService: BoardPinsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: BoardPinDto })
  create(@Body() createBoardPinDto: CreateBoardPinDto) {
    return this.boardPinsService.create(createBoardPinDto);
  }

  @Get()
  @ApiOkResponse({
    type: BoardPinDto,
    isArray: true,
  })
  @ApiOperation({
    operationId: 'findAllBoardPins',
  })
  findAll() {
    return this.boardPinsService.findAll();
  }

  @Get(':id')
  @RNotFoundResponse()
  findOne(@Param() params: FindByUUIDDto) {
    return this.boardPinsService.findOne(params.id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @RNotFoundResponse()
  @ApiOkResponse({ type: BoardPinDto, description: 'The updated resource' })
  update(
    @Param() params: FindByUUIDDto,
    @Body() updateBoardPinDto: UpdateBoardPinDto
  ) {
    return this.boardPinsService.update(params.id, updateBoardPinDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @RNotFoundResponse()
  @ApiNoContentResponse({ description: 'Board Pin deleted' })
  remove(@Param() params: FindByUUIDDto) {
    return this.boardPinsService.remove(params.id);
  }
}
