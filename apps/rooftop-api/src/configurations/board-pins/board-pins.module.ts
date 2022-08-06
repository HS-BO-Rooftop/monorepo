import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardPinsController } from './board-pins.controller';
import { BoardPinsService } from './board-pins.service';
import { BoardPinEntity } from './entities/board-pin.entity';

@Module({
  controllers: [BoardPinsController],
  providers: [BoardPinsService],
  imports: [TypeOrmModule.forFeature([BoardPinEntity])],
  exports: [BoardPinsService],
})
export class BoardPinsModule {}
