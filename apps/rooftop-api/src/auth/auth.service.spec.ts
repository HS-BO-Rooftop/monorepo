import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BehaviorSubject } from 'rxjs';
import { ApplicationService } from '../application/application.service';
import { TypeOrmTestModule } from '../test/test-connection';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { RefreshTokenEntity } from './entities/refresh-token.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOneWithPassword: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('secret'),
          },
        },
        {
          provide: ApplicationService,
          useValue: {
            findOne: jest.fn(),
            boostrapDone: new BehaviorSubject(true),
          },
        },
      ],
      imports: [
        TypeOrmTestModule,
        TypeOrmModule.forFeature([RefreshTokenEntity]),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
