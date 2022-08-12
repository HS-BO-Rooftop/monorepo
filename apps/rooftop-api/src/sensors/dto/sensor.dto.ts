import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SensorInterfaceDto } from '../sensor-interfaces/dto/sensor-interface.dto';
import { SensorTypeDto } from '../sensor-types/dto/sensory-type.dto';

export class SensorConfigurationDto {
  @ApiProperty({
    description: 'The unique identifier of the sensor configuration.',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the sensor configuration.',
    example: 'DS18B20',
  })
  name: string;

  @ApiProperty({
    description: 'The id of the sensor type.',
    format: 'uuid',
  })
  sensorTypeId: string;

  @ApiProperty({
    description: 'The id of the sensor interface.',
    format: 'uuid',
  })
  sensorInterfaceId: string;

  @ApiPropertyOptional({
    description:
      'The i2c address of the sensor. Only applicable to i2c interfaced sensors.',
  })
  i2cAddress?: number;

  @ApiProperty({
    description: 'The sensor type of the sensor configuration.',
  })
  sensorType: SensorTypeDto;

  @ApiProperty({
    description: 'The sensor interface of the sensor configuration.',
  })
  interface: SensorInterfaceDto;
}
