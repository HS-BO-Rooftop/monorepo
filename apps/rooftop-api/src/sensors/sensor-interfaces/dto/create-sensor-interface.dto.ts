import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateSensorInterfaceDto {
  @ApiProperty({
    maxLength: 255,
    description: 'The name of this sensor interface. Must be unique',
    uniqueItems: true,
  })
  @IsString()
  @MaxLength(255)
  name: string;
}
