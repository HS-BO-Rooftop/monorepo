import { ApiProperty } from '@nestjs/swagger';
import { BoardDto } from '../../configurations/boards/dto/board.dto';

export class BedDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: BoardDto, isArray: true })
  boards: BoardDto[];
}
