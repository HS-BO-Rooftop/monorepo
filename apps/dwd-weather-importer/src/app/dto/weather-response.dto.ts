export type WeatherResponseDto = {
  weather: WeatherReport[];
};

export type WeatherReport = {
  timestamp: string;
  cloud_cover: number | null;
  condition: Condition | null;
  dew_point: number | null;
  icon: Icon | null;
  precipitation: number | null;
  pressure_ms: number | null;
  relative_humidity: number | null;
  sunshine: number | null;
  temperature: number | null;
  visibility: number | null;
  wind_direction: number | null;
  wind_speed: number | null;
  wind_gust_direction: number | null;
  wind_gust_speed: number | null;
};

export type Condition =
  | 'dry'
  | 'fog'
  | 'rain'
  | 'sleet'
  | 'snow'
  | 'hail'
  | 'thunderstorm';
export type Icon =
  | 'clear-day'
  | 'clear-night'
  | 'partly-cloudy-day'
  | 'partly-cloudy-night'
  | 'cloudy'
  | 'fog'
  | 'wind'
  | 'rain'
  | 'sleet'
  | 'snow'
  | 'hail'
  | 'thunderstorm';
