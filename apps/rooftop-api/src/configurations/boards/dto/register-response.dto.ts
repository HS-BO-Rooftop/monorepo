import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { BoardConfigurationDto } from './board-configuration.dto';
import { BoardDto } from './board.dto';

export class RegisterResponseDto extends PartialType(BoardDto) {
  @ApiProperty({
    description: 'Server timestamp when the response was send to the client',
    format: 'date-time',
  })
  timestamp: number;

  @ApiProperty({ description: 'ID of the board' })
  id: string;

  @ApiPropertyOptional({
    description:
      'Existing configuration of the board. Will be set if the provided id was valid',
  })
  configurations: BoardConfigurationDto[];
}
