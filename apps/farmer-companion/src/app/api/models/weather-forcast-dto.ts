/* tslint:disable */
/* eslint-disable */
export interface WeatherForcastDto {
  cloud_cover: null | number;
  condition: null | 'dry' | 'fog' | 'rain' | 'sleet' | 'snow' | 'hail' | 'thunderstorm';
  dew_point: null | number;
  icon: null | 'clear-day' | 'clear-night' | 'partly-cloudy-day' | 'partly-cloudy-night' | 'cloudy' | 'fog' | 'wind' | 'rain' | 'sleet' | 'snow' | 'hail' | 'thunderstorm';
  precipitation: null | number;
  pressure_msl: null | number;
  relative_humidity: null | number;
  source_id: number;
  sunshine: null | number;
  temperature: null | number;
  timestamp: string;
  visibility: null | number;
  wind_direction: null | number;
  wind_gust_direction: null | number;
  wind_gust_speed: null | number;
  wind_speed: null | number;
}
