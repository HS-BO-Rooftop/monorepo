import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateBoardPinDto {
  @ApiProperty({
    description: 'The name of the pin',
    uniqueItems: true,
    maxLength: 10,
  })
  @IsString()
  @MaxLength(10)
  pin: string;
}
