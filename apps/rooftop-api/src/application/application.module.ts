import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationEntity } from './entities/application.entity';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [ApplicationService],
  imports: [TypeOrmModule.forFeature([ApplicationEntity])],
})
export class ApplicationModule {}
