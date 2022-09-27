import { Transform, Type } from 'class-transformer';
import { WeatherCondition } from './weather-condition.type';
import { WeatherIcon } from './weather-icon.type';

export class WeatherDto {
  @Transform(({ value }) => {
    return new Date(value);
  })
  timestamp: Date;
  cloud_cover: number | null;
  condition: WeatherCondition | null;
  dew_point: number | null;
  icon: WeatherIcon | null;
  precipitation_10: number | null;
  precipitation_30: number | null;
  precipitation_60: number | null;
  pressure_msl: number | null;
  relative_humidity: number | null;
  sunshine_30: number | null;
  sunshine_60: number | null;
  temperature: number | null;
  visibility: number | null;
  wind_direction_10: number | null;
  wind_direction_30: number | null;
  wind_direction_60: number | null;
  wind_speed_10: number | null;
  wind_speed_30: number | null;
  wind_speed_60: number | null;
  wind_gust_direction_10: number | null;
  wind_gust_direction_30: number | null;
  wind_gust_direction_60: number | null;
  wind_gust_speed_10: number | null;
  wind_gust_speed_30: number | null;
  wind_gust_speed_60: number | null;
}

export class CurrentWeatherResponseDto {
  @Type(() => WeatherDto)
  weather: WeatherDto;
}
