import { Controller, Get, Sse } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { map } from 'rxjs';
import { DwdWeatherDto } from './dto/dwd/current-weather-response.dto';
import { WeatherForcastDto } from './dto/dwd/forecast-weather-response.dto';
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

  @Sse('current/local/sse')
  currentLocalWeatherSse() {
    return this.weatherService.$currentLocalWeather.pipe(
      map((data) => ({ data }))
    );
  }

  @Get('current/dwd')
  @ApiOkResponse({
    description: 'Get the current weather',
    type: DwdWeatherDto,
  })
  async getDwdWeather() {
    return this.weatherService.currentDwDWeather;
  }

  @Sse('current/dwd/sse')
  currentDwdWeatherSse() {
    return this.weatherService.$currentDwDWeather.pipe(
      map((data) => ({ data }))
    );
  }

  @Get('forecast/dwd')
  @ApiOkResponse({
    description: 'Gets the weather forecast',
    type: WeatherForcastDto,
    isArray: true,
  })
  async getDwdWeatherForecast() {
    return this.weatherService.dwdForecast;
  }

  @Sse('forecast/dwd/sse')
  currentDwdForecastSse() {
    return this.weatherService.$dwdForecast.pipe(map((data) => ({ data })));
  }
}
