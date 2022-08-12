import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class SensorTypeDto {
  @ApiProperty({ format: 'uuid', description: 'The UUID of the sensor type' })
  @IsString()
  id: string;

  @ApiProperty({
    maxLength: 255,
    description: 'The name of this sensor. Must be unique',
    uniqueItems: true,
  })
  @IsString()
  @MaxLength(255)
  name: string;
}
