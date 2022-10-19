import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Sse,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { map } from 'rxjs';
import { RInternalServerErrorResponse } from '../common/responses/InternalServierErrorResponse.dto';
import { DwdWeatherDto } from './dto/dwd/current-weather-response.dto';
import { WeatherForcastDto } from './dto/dwd/forecast-weather-response.dto';
import { LocalWeatherStationRow } from './dto/local/weather-station-data.type';
import { TimeRangeRequestDto } from './dto/time-range-request.dto';
import { WeatherTodayResponseDto } from './dto/weather-today-response.dto';
import { WeatherService } from './weather.service';

@Controller('weather')
@ApiTags('Weather')
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

  @Get('today')
  @ApiOkResponse({
    type: WeatherTodayResponseDto,
  })
  @RInternalServerErrorResponse()
  async getToday() {
    return this.weatherService.getTodayWeather();
  }

  @Get('historic')
  @ApiOkResponse({
    type: WeatherTodayResponseDto,
  })
  @RInternalServerErrorResponse()
  async getHistoric(@Query() query: TimeRangeRequestDto) {
    // Check, that the time range is valid
    if (query.from >= query.to) {
      throw new BadRequestException('From must be before to');
    }
    return this.weatherService.getHistoricWeather(query.from, query.to);
  }
}
