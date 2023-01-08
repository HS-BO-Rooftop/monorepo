import { differenceInMinutes } from 'date-fns';
import { BehaviorSubject } from 'rxjs';
import { WeatherService } from '../../../weather/weather.service';
import { evaluatorType, IEvaluator } from '../IEvaluator';
import { ISerializeable } from '../ISerializeable';

export type weatherTarget = 'rain' | 'sun';

export class WeatherCondition implements IEvaluator, ISerializeable {
  public type: evaluatorType = 'weather';
  public isFullfilled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    public target: weatherTarget,
    public lookaheadminutes: number,
    public weatherService: WeatherService
  ) {
    this.weatherService.$currentLocalWeather.subscribe(async () => {
      const res = await this.evaluate();
      this.isFullfilled.next(res);
    });
  }

  private async evaluate(): Promise<boolean> {
    if (this.lookaheadminutes === 0) {
      return this.evaluateCurrent();
    }
    return this.evaluateFuture();
  }

  private async evaluateCurrent(): Promise<boolean> {
    const data = await this.weatherService.getCurrentLocalWeather();
    // Check that the data is not older then 15 minutes
    if (!data || differenceInMinutes(new Date(), data.time) > 15) {
      // Fallback to dwd data
      const dwdData = await this.weatherService.currentDwDWeather;
      if (!dwdData) {
        return false;
      }
      if (this.target === 'rain') {
        return dwdData.precipitation_10 > 0;
      }
      if (this.target === 'sun') {
        return dwdData.precipitation_10 === 0;
      }
      return;
    }

    if (this.target === 'rain') {
      return data.rain > 0;
    }
    if (this.target === 'sun') {
      return data.rain === 0;
    }
  }

  private evaluateFuture(): boolean {
    const forecastData = this.weatherService.dwdForecast;
    if (!forecastData) {
      return false;
    }

    const now = new Date();
    const forecasts = forecastData.filter((forecast) => {
      return (
        differenceInMinutes(forecast.timestamp, now) <= this.lookaheadminutes
      );
    });

    if (forecasts.length === 0) {
      return false;
    }

    // If we have a target of rain, we need to check if there is any rain in the look ahead period
    if (this.target === 'rain') {
      return forecasts.some((forecast) => forecast.precipitation > 0);
    } else {
      return forecasts.every((forecast) => forecast.precipitation === 0);
    }
  }

  serialize(): string {
    return JSON.stringify({
      target: this.target,
      type: this.type,
      lookaheadminutes: this.lookaheadminutes,
    });
  }
}
