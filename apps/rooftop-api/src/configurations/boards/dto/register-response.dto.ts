import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BoardConfigurationDto } from './board-configuration.dto';
import { BoardDto } from './board.dto';

export class RegisterResponseDto extends BoardDto {
  @ApiProperty({
    description: 'Server timestamp when the response was send to the client',
    format: 'unix timestamp in milliseconds',
  })
  timestamp: number;

  @ApiPropertyOptional({
    type: [BoardConfigurationDto],
    description:
      'Existing configuration of the board. Returns only active configurations',
  })
  configurations: BoardConfigurationDto[];
}
