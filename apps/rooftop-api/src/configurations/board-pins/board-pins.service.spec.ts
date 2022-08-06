import { Test, TestingModule } from '@nestjs/testing';
import { BoardPinsService } from './board-pins.service';

describe('BoardPinsService', () => {
  let service: BoardPinsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardPinsService],
    }).compile();

    service = module.get<BoardPinsService>(BoardPinsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
