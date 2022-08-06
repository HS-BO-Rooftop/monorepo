import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';
import { SensorConfigurationDto } from '../../sensors/dto/sensor.dto';
import { BoardPinDto } from '../board-pins/dto/board-pin.dto';
import { BoardDto } from '../boards/dto/board.dto';

export class BoardSensorDto {
  @ApiProperty({
    format: 'uuid',
    description: 'The UUID of the configuration. Needs to be a v4 UUID',
  })
  @IsUUID('4')
  id: string;

  @ApiProperty({
    format: 'uuid',
    description: 'The UUID of the board. Needs to be a v4 UUID',
  })
  @IsUUID('4')
  deviceId: string;

  @ApiProperty({
    format: 'uuid',
    description: 'The UUID of the sensor configuration. Needs to be a v4 UUID',
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

  @ApiProperty({ type: BoardPinDto, description: 'The pin of the sensor' })
  boardPin: BoardPinDto;

  @ApiProperty({
    type: SensorConfigurationDto,
    description: 'The sensor configuration',
  })
  sensor: SensorConfigurationDto;

  @ApiProperty({
    type: BoardDto,
    description: 'The board this configuration belongs to',
  })
  board: BoardDto;
}
