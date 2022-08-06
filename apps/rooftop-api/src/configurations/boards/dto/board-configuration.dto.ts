import { SensorConfigurationDto } from '../../../sensors/dto/sensor.dto';
import { BoardPinDto } from '../../board-pins/dto/board-pin.dto';
import { BoardDto } from './board.dto';

export class BoardConfigurationDto {
  id: string;
  isConnected: boolean;
  boardPin: BoardPinDto;
  sensor: SensorConfigurationDto;
  board: BoardDto;
}
