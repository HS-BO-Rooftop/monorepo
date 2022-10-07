import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { WeatherCondition } from './weather-condition.type';
import { WeatherIcon, WeatherIconValues } from './weather-icon.type';

export class WeatherForecastResponseDto {
  weather: WeatherForcastDto[];
}

export class WeatherForcastDto {
  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  timestamp: Date;

  @ApiProperty()
  source_id: number;

  @ApiProperty({ nullable: true })
  cloud_cover: number | null;

  @ApiProperty({ nullable: true, enum: WeatherCondition })
  condition: WeatherCondition | null;

  @ApiProperty({ nullable: true })
  dew_point: number | null;

  @ApiProperty({
    nullable: true,
    enum: WeatherIconValues,
  })
  icon: WeatherIcon | null;

  @ApiProperty({ nullable: true })
  precipitation: number | null;

  @ApiProperty({ nullable: true })
  pressure_msl: number | null;

  @ApiProperty({ nullable: true })
  relative_humidity: number | null;

  @ApiProperty({ nullable: true })
  sunshine: number | null;

  @ApiProperty({ nullable: true })
  temperature: number | null;

  @ApiProperty({ nullable: true })
  visibility: number | null;

  @ApiProperty({ nullable: true })
  wind_direction: number | null;

  @ApiProperty({ nullable: true })
  wind_speed: number | null;

  @ApiProperty({ nullable: true })
  wind_gust_direction: number | null;

  @ApiProperty({ nullable: true })
  wind_gust_speed: number | null;
}
