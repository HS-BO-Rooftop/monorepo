import { ApiProperty } from '@nestjs/swagger';

export class HeartbeatResponseDto {
  @ApiProperty({
    description: 'Server timestampt when the response was send to the client',
    format: 'date-time',
  })
  timestamp: number;
}
