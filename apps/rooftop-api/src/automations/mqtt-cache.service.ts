import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';

export type mqttCacheEntry = {
  boardId: string;
  sensorId: string;
  data: any;
};

@Injectable()
export class MQTTCacheService {
  private _cache = new BehaviorSubject<mqttCacheEntry[]>([]);

  public get cache(): Observable<mqttCacheEntry[]> {
    return this._cache.asObservable();
  }

  public addSensorData(data: mqttCacheEntry) {
    const currentCache = this._cache.getValue();
    // Find the entry for this sensor
    const index = currentCache.findIndex(
      (entry) => entry.sensorId === data.sensorId
    );
    if (index === -1) {
      // If it doesn't exist, add it
      currentCache.push(data);
    } else {
      // If it does exist, replace it
      currentCache[index] = data;
    }
    this._cache.next(currentCache);
  }
}
