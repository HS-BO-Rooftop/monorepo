import { Test, TestingModule } from '@nestjs/testing';
import { SensorMqttController } from './sensor-mqtt.controller';

describe('SensorMqttController', () => {
  let controller: SensorMqttController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorMqttController],
    }).compile();

    controller = module.get<SensorMqttController>(SensorMqttController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
