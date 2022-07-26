import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmTestModule } from '../test/test-connection';
import { PasswordResetCodeEntity } from './entities/password-reset-code.entity';
import { PasswordResetService } from './password-reset.service';

describe('PasswordResetService', () => {
  let service: PasswordResetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordResetService],
      imports: [
        TypeOrmTestModule,
        TypeOrmModule.forFeature([PasswordResetCodeEntity]),
      ],
    }).compile();

    service = module.get<PasswordResetService>(PasswordResetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
