import { Test, TestingModule } from '@nestjs/testing';
import { AutomationsService } from './automations.service';

describe('AutomationsService', () => {
  let service: AutomationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutomationsService],
    }).compile();

    service = module.get<AutomationsService>(AutomationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
