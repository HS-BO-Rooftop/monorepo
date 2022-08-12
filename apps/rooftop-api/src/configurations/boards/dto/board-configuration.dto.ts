import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsUUID } from 'class-validator';
import { SensorConfigurationDto } from '../../../sensors/dto/sensor.dto';
import { BoardPinDto } from '../../board-pins/dto/board-pin.dto';
import { BoardSensorEntity } from '../../entities/configuration.entity';
import { BoardDto } from './board.dto';

export class BoardConfigurationDto {
  @ApiProperty({
    format: 'uuid',
    description: 'The UUID of the configuration. Must be a UUID v4',
  })
  @IsUUID('4')
  id: string;

  @ApiProperty({ description: 'True if the configuration is active' })
  @IsBoolean()
  isConnected: boolean;

  @Exclude()
  pinId: string;

  @Exclude()
  deviceId: string;

  @Exclude()
  sensorId: string;

  @ApiProperty({
    description: 'The pin the sensor is connected to',
    type: BoardPinDto,
  })
  boardPin: BoardPinDto;

  @ApiProperty({
    description: 'The sensor configuration',
    type: SensorConfigurationDto,
  })
  sensor: SensorConfigurationDto;

  @ApiProperty({
    description: 'The board this configuration refers to',
    type: BoardDto,
  })
  board: BoardDto;

  constructor(partial: Partial<BoardSensorEntity>) {
    Object.assign(this, partial);
  }
}
