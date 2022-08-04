import { Test, TestingModule } from '@nestjs/testing';
import { SensorTypesController } from './sensor-types.controller';
import { SensorTypesService } from './sensor-types.service';

describe('SensorTypesController', () => {
  let controller: SensorTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorTypesController],
      providers: [SensorTypesService],
    }).compile();

    controller = module.get<SensorTypesController>(SensorTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
