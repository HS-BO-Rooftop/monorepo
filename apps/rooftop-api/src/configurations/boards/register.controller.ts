import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RInternalServerErrorResponse } from '../../common/responses/InternalServierErrorResponse.dto';
import { RNotFoundResponse } from '../../common/responses/NotFoundResponse.dto';
import { ConfigurationsService } from '../configurations.service';
import { BoardsService } from './boards.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@Controller('register')
@ApiTags('Register', 'Boards')
export class RegisterController {
  constructor(
    private readonly configService: ConfigurationsService,
    private readonly boardService: BoardsService
  ) {}

  @Post()
  @ApiOkResponse({
    type: RegisterResponseDto,
  })
  @RNotFoundResponse({ description: 'The requested board nolonger exists' })
  @RInternalServerErrorResponse()
  async register(@Body() body: RegisterRequestDto) {
    if (body.id === null) {
      // Create a new board
      const board = await this.boardService.create({
        name: 'New board',
      });
      return {
        ...board,
        configuration: [],
        timestamp: Math.floor(new Date().getTime() / 1000),
      };
    } else {
      // Try to get the board
      const board = await this.boardService.findOne(body.id);
      if (!board) {
        throw new NotFoundException('No board with the provided id was found');
      } else {
        const configurations = await this.configService.findAllByBoard(
          board.id,
          true
        );
        return {
          ...board,
          configuration: configurations,
          timestamp: Math.floor(new Date().getTime() / 1000),
        };
      }
    }
  }
}
