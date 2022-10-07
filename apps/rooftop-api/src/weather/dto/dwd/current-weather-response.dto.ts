import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { WeatherCondition } from './weather-condition.type';
import { WeatherIcon, WeatherIconValues } from './weather-icon.type';

export class DwdWeatherDto {
  @Transform(({ value }) => {
    return new Date(value);
  })
  @ApiProperty({ nullable: true })
  timestamp: Date;

  @ApiProperty({ nullable: true })
  cloud_cover: number | null;

  @ApiProperty({ enum: WeatherCondition, nullable: true })
  condition: WeatherCondition | null;

  @ApiProperty({ nullable: true })
  dew_point: number | null;

  @ApiProperty({
    enum: WeatherIconValues,
    nullable: true,
  })
  icon: WeatherIcon | null;

  @ApiProperty({ nullable: true })
  precipitation_10: number | null;

  @ApiProperty({ nullable: true })
  precipitation_30: number | null;

  @ApiProperty({ nullable: true })
  precipitation_60: number | null;

  @ApiProperty({ nullable: true })
  pressure_msl: number | null;

  @ApiProperty({ nullable: true })
  relative_humidity: number | null;

  @ApiProperty({ nullable: true })
  sunshine_30: number | null;

  @ApiProperty({ nullable: true })
  sunshine_60: number | null;

  @ApiProperty({ nullable: true })
  temperature: number | null;

  @ApiProperty({ nullable: true })
  visibility: number | null;

  @ApiProperty({ nullable: true })
  wind_direction_10: number | null;

  @ApiProperty({ nullable: true })
  wind_direction_30: number | null;

  @ApiProperty({ nullable: true })
  wind_direction_60: number | null;

  @ApiProperty({ nullable: true })
  wind_speed_10: number | null;

  @ApiProperty({ nullable: true })
  wind_speed_30: number | null;

  @ApiProperty({ nullable: true })
  wind_speed_60: number | null;

  @ApiProperty({ nullable: true })
  wind_gust_direction_10: number | null;

  @ApiProperty({ nullable: true })
  wind_gust_direction_30: number | null;

  @ApiProperty({ nullable: true })
  wind_gust_direction_60: number | null;

  @ApiProperty({ nullable: true })
  wind_gust_speed_10: number | null;

  @ApiProperty({ nullable: true })
  wind_gust_speed_30: number | null;

  @ApiProperty({ nullable: true })
  wind_gust_speed_60: number | null;
}

export class CurrentWeatherResponseDto {
  @Type(() => DwdWeatherDto)
  weather: DwdWeatherDto;
}
