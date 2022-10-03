/* tslint:disable */
/* eslint-disable */
export interface DwdWeatherDto {
  cloud_cover: null | number;
  condition: null | 'dry' | 'fog' | 'rain' | 'sleet' | 'snow' | 'hail' | 'thunderstorm';
  dew_point: null | number;
  icon: null | 'clear-day' | 'clear-night' | 'partly-cloudy-day' | 'partly-cloudy-night' | 'cloudy' | 'fog' | 'wind' | 'rain' | 'sleet' | 'snow' | 'hail' | 'thunderstorm';
  precipitation_10: null | number;
  precipitation_30: null | number;
  precipitation_60: null | number;
  pressure_msl: null | number;
  relative_humidity: null | number;
  sunshine_30: null | number;
  sunshine_60: null | number;
  temperature: null | number;
  timestamp: null | string;
  visibility: null | number;
  wind_direction_10: null | number;
  wind_direction_30: null | number;
  wind_direction_60: null | number;
  wind_gust_direction_10: null | number;
  wind_gust_direction_30: null | number;
  wind_gust_direction_60: null | number;
  wind_gust_speed_10: null | number;
  wind_gust_speed_30: null | number;
  wind_gust_speed_60: null | number;
  wind_speed_10: null | number;
  wind_speed_30: null | number;
  wind_speed_60: null | number;
}
