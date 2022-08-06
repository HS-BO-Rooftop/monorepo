import { Test, TestingModule } from '@nestjs/testing';
import { BoardPinsController } from './board-pins.controller';
import { BoardPinsService } from './board-pins.service';

describe('BoardPinsController', () => {
  let controller: BoardPinsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardPinsController],
      providers: [BoardPinsService],
    }).compile();

    controller = module.get<BoardPinsController>(BoardPinsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
