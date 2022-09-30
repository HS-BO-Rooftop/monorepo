import { IsEnum, IsString } from 'class-validator';

export class WeatherRequestDto {
  @IsString()
  @IsEnum(['local', 'dwd'])
  source: 'local' | 'dwd';
}
