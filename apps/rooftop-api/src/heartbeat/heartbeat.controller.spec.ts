import { Test, TestingModule } from '@nestjs/testing';
import { HeartbeatController } from './heartbeat.controller';

describe('HeartbeatController', () => {
  let controller: HeartbeatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeartbeatController],
    }).compile();

    controller = module.get<HeartbeatController>(HeartbeatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
