import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { BoardEntity } from '../configurations/boards/entities/board.entity';
import { HeartbeatController } from './heartbeat.controller';
import { HeartbeatService } from './heartbeat.service';

@Module({
  providers: [HeartbeatService],
  imports: [TypeOrmModule.forFeature([BoardEntity]), AuthModule],
  controllers: [HeartbeatController],
})
export class HeartbeatModule {}
