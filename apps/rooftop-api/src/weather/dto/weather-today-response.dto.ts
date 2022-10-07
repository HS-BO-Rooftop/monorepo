import { ApiProperty } from '@nestjs/swagger';
import { WeatherIcon, WeatherIconValues } from './dwd/weather-icon.type';

export class WeatherTodayRowDto {
  @ApiProperty({ type: String, format: 'date-time' })
  timestamp: Date;

  @ApiProperty()
  temperature: number;

  @ApiProperty({ nullable: true })
  humidity: number | null;

  @ApiProperty()
  windSpeed: number;

  @ApiProperty({ nullable: true, enum: WeatherIconValues })
  icon: WeatherIcon;

  @ApiProperty()
  rain: number;

  @ApiProperty()
  solarDuration: number;
}

export class WeatherTodayResponseDto {
  @ApiProperty({ type: WeatherTodayRowDto, isArray: true })
  weather: WeatherTodayRowDto[];
}
