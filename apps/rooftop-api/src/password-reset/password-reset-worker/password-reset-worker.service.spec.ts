import { Test, TestingModule } from '@nestjs/testing';
import { PasswordResetService } from '../password-reset.service';
import { PasswordResetWorkerService } from './password-reset-worker.service';

describe('PasswordResetWorkerService', () => {
  let service: PasswordResetWorkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordResetWorkerService,
        {
          provide: PasswordResetService,
          useValue: {
            cleanupExpiredCodes: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PasswordResetWorkerService>(
      PasswordResetWorkerService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
