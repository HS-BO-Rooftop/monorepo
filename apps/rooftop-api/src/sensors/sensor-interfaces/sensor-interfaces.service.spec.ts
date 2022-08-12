import { Test, TestingModule } from '@nestjs/testing';
import { SensorInterfacesService } from './sensor-interfaces.service';

describe('SensorInterfacesService', () => {
  let service: SensorInterfacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorInterfacesService],
    }).compile();

    service = module.get<SensorInterfacesService>(SensorInterfacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
