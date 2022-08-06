import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateBoardPinDto {
  @ApiProperty({
    description: 'The name of the pin',
    uniqueItems: true,
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  pin: string;
}
