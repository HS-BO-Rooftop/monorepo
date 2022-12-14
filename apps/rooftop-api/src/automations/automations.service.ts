import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GpioAction } from './classes/actions/gpio-action';
import { AutomationConfig } from './classes/automation-config';
import { SensorValueCondition } from './classes/conditions/sensor-value';
import { mqttCacheEntry, MQTTCacheService } from './mqtt-cache.service';

@Injectable()
export class AutomationsService {
  private automationConfigs: AutomationConfig[] = [];
  private previousData: mqttCacheEntry[] = [];

  constructor(
    readonly mqttCache: MQTTCacheService,
    @Inject('SENSOR_MQTT')
    readonly mqttClient: ClientProxy
  ) {
    const testConfig = new AutomationConfig();
    testConfig.triggers = [
      // new TimeCondition('gt', new Date('2021-01-01T08:49:00.000Z')),
      new SensorValueCondition('1', 'eq', 20, mqttCache.cache)
    ];
    testConfig.conditions = [
      new SensorValueCondition('2', 'gte', 20, mqttCache.cache)
    ];
    testConfig.actions = [
      new GpioAction('1', '1', true, mqttClient),
    ];
    this.automationConfigs = [testConfig];
  }
}
