import { Test, TestingModule } from '@nestjs/testing';
import { HeartbeatService } from './heartbeat.service';

describe('HeartbeatService', () => {
  let service: HeartbeatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeartbeatService],
    }).compile();

    service = module.get<HeartbeatService>(HeartbeatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
