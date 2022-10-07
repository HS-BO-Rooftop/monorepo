import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty({
    description: 'The name of the board',
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    format: 'uuid',
    description: 'The plant associated with the board',
    maxLength: 255,
  })
  @IsUUID()
  plantId: string;
}
