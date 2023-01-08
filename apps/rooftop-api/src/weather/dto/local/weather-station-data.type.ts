import { ApiProperty } from '@nestjs/swagger';

export class LocalWeatherStationRow {
  @ApiProperty()
  UV: number;

  @ApiProperty()
  absbaro: number;

  @ApiProperty()
  baro: number;

  @ApiProperty()
  dailyrain: number;

  @ApiProperty()
  dewpt: number;

  @ApiProperty()
  humidity: number;

  @ApiProperty()
  indoorhumidity: number;

  @ApiProperty()
  indoortemp: number;

  @ApiProperty()
  monthlyrain: number;

  @ApiProperty()
  rain: number;

  @ApiProperty()
  realtime: number;

  @ApiProperty()
  rtfreq: number;

  @ApiProperty()
  solarradiation: number;

  @ApiProperty()
  temp: number;

  @ApiProperty()
  weeklyrain: number;

  @ApiProperty()
  windchill: number;

  @ApiProperty()
  winddir: number;

  @ApiProperty()
  windgust: number;

  @ApiProperty()
  windspeed: number;

  @ApiProperty()
  time: Date;
}
