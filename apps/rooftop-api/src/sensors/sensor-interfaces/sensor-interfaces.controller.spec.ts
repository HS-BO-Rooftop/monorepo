import { Test, TestingModule } from '@nestjs/testing';
import { SensorInterfacesController } from './sensor-interfaces.controller';
import { SensorInterfacesService } from './sensor-interfaces.service';

describe('SensorInterfacesController', () => {
  let controller: SensorInterfacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorInterfacesController],
      providers: [SensorInterfacesService],
    }).compile();

    controller = module.get<SensorInterfacesController>(
      SensorInterfacesController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
