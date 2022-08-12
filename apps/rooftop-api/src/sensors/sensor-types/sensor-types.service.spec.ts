import { Test, TestingModule } from '@nestjs/testing';
import { SensorTypesService } from './sensor-types.service';

describe('SensorTypesService', () => {
  let service: SensorTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorTypesService],
    }).compile();

    service = module.get<SensorTypesService>(SensorTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
