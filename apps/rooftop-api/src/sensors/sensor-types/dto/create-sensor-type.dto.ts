import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateSensorTypeDto {
  @ApiProperty({ maxLength: 255 })
  @MaxLength(255)
  @IsString()
  name: string;
}
