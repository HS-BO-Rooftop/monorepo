import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty({
    description: 'The name of the board',
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  name: string;
}
