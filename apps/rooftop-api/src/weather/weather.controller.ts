import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DwdWeatherDto } from './dto/dwd/current-weather-response.dto';
import { LocalWeatherStationRow } from './dto/local/weather-station-data.type';
import { WeatherService } from './weather.service';

@Controller('weather')
@ApiTags('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('current/local')
  @ApiOkResponse({
    description: 'Get the current weather',
    type: LocalWeatherStationRow,
  })
  async getLocalWeather() {
    return this.weatherService.getCurrentLocalWeather();
  }

  @Get('current/dwd')
  @ApiOkResponse({
    description: 'Get the current weather',
    type: DwdWeatherDto,
  })
  async getDwdWeather() {
    return this.weatherService.currentDwDWeather;
  }
}
