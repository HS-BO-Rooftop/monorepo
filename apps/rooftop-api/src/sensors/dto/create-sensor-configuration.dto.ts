import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSensorConfigurationDto {
  @ApiProperty({ maxLength: 255, description: 'The name of this sensor' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ format: 'uuid', description: 'The UUID of the sensor type' })
  @IsString()
  sensorTypeId: string;

  @ApiProperty({
    format: 'uuid',
    description: 'The UUID of the sensor interface',
  })
  @IsString()
  sensorInterfaceId: string;

  @ApiProperty({ description: 'The I2C address of the sensor' })
  @IsNumber()
  @IsOptional()
  i2cAddress?: number;
}
