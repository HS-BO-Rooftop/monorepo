import { BehaviorSubject } from 'rxjs';
import { LocalWeatherStationRow } from '../../../weather/dto/local/weather-station-data.type';
import { WeatherService } from '../../../weather/weather.service';
import { evaluatorType, IEvaluator } from '../IEvaluator';
import { ISerializeable } from '../ISerializeable';

type weatherTarget = 'rain' | 'sun';

export class WeatherCondition implements IEvaluator, ISerializeable {
  public type: evaluatorType = 'weather';
  public isFullfilled: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    public sensorId: string,
    public target: weatherTarget,
    public weatherService: WeatherService
  ) {
    this.weatherService.$currentLocalWeather.subscribe((weather) => {
      const res = this.evaluate(weather);
      this.isFullfilled.next(res);
    });
  }

  private evaluate(data: LocalWeatherStationRow): boolean {
    if (data.rain === 0 && this.target === 'sun') {
      return true;
    }
    if (data.rain > 0 && this.target === 'rain') {
      return true;
    }
    return false;
  }

  serialize(): string {
    return JSON.stringify({
      sensorId: this.sensorId,
      target: this.target,
      type: this.type,
    });
  }
}
