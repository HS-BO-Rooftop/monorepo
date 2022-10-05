import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class HeartbeatRequestDto {
  @ApiProperty({ description: 'ID of the board making the heartbeat request' })
  @IsUUID('4', { message: 'You must provide a valid board id' })
  id: string;
}
