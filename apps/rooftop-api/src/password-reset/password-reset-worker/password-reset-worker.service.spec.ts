import { Test, TestingModule } from '@nestjs/testing';
import { PasswordResetWorkerService } from './password-reset-worker.service';

describe('PasswordResetWorkerService', () => {
  let service: PasswordResetWorkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordResetWorkerService],
    }).compile();

    service = module.get<PasswordResetWorkerService>(
      PasswordResetWorkerService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
