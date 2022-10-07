/* tslint:disable */
/* eslint-disable */
export interface WeatherTodayRowDto {
  humidity: null | number;
  icon: null | 'clear-day' | 'clear-night' | 'partly-cloudy-day' | 'partly-cloudy-night' | 'cloudy' | 'fog' | 'wind' | 'rain' | 'sleet' | 'snow' | 'hail' | 'thunderstorm';
  rain: number;
  solarDuration: number;
  temperature: number;
  timestamp: string;
  windSpeed: number;
}
