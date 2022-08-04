import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength } from 'class-validator';

export class SensorInterfaceDto {
  @ApiProperty({
    format: 'uuid',
    description: 'The UUID of the sensor interface',
  })
  @IsUUID('4')
  id: string;

  @ApiProperty({
    maxLength: 255,
    description: 'The name of this sensor interface',
    examples: ['I2C', 'SPI', 'ADC'],
    uniqueItems: true,
  })
  @IsString()
  @MaxLength(255)
  name: string;
}
