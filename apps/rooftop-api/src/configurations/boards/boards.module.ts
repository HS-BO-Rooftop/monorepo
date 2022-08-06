import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardPinsModule } from '../board-pins/board-pins.module';
import { ConfigurationsModule } from '../configurations.module';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardEntity } from './entities/board.entity';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
  imports: [
    TypeOrmModule.forFeature([BoardEntity]),
    BoardPinsModule,
    ConfigurationsModule,
  ],
  exports: [BoardsService],
})
export class BoardsModule {}
