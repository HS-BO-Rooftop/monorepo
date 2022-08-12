import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShutdownService } from '../shutdown/shutdown.service';
import { TypeOrmTestModule } from '../test/test-connection';
import { ApplicationService } from './application.service';
import { ApplicationEntity } from './entities/application.entity';

describe('ApplicationService', () => {
  let service: ApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key) => {
              if (key === 'CLIENT_ID') {
                return 'client-id';
              } else {
                return 'http://localhost:3000';
              }
            }),
          },
        },
        {
          provide: ShutdownService,
          useValue: {
            shutdown: jest.fn(),
          },
        },
      ],
      imports: [
        TypeOrmTestModule,
        TypeOrmModule.forFeature([ApplicationEntity]),
      ],
    }).compile();

    service = module.get<ApplicationService>(ApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
