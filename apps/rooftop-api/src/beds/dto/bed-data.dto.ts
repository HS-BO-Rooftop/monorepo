import { ApiProperty } from '@nestjs/swagger';
import { SensorConfigurationDto } from '../../sensors/dto/sensor.dto';

class SensorValue {
    @ApiProperty()
    _time: Date;

    @ApiProperty()
    _value: number;
}

class SensorData {
  @ApiProperty({ type: [SensorValue] })
  values: SensorValue[];

  @ApiProperty()
  sensor: SensorConfigurationDto;
  
  @ApiProperty()
  board_sensor_id: string;
}

export class BedSensorDataDto {
  @ApiProperty()
  boardId: string;

  @ApiProperty({ type: [SensorData] })
  data: SensorData[];
}
