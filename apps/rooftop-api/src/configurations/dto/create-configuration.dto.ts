import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';

export class CreateBoardSensorDto {
  @ApiProperty({
    format: 'uuid',
    description: 'The UUID of the board. Needs to be a v4 UUID',
  })
  @IsUUID('4')
  deviceId: string;

  @ApiProperty({
    format: 'uuid',
    description: 'The UUID of the sensor. Needs to be a v4 UUID',
  })
  @IsUUID('4')
  sensorId: string;

  @ApiProperty({
    description: 'Whether the sensor is connected to the board and active',
  })
  @IsBoolean()
  isConnected: boolean;

  @ApiProperty({
    format: 'uuid',
    description: 'The UUID of the pin. Needs to be a v4 UUID',
  })
  @IsUUID('4')
  pinId: string;
}
