import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateSensorDataEntry {
  @ApiProperty({ format: 'date-time' })
  @Transform(({ value }) => new Date(value))
  timestamp: string;

  @ApiProperty()
  value: number | string | boolean | null;
}

export class CreateSensorDataRequestDto {
  [configurationId: string]: CreateSensorDataEntry[];
}
