import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BedsController } from './beds.controller';
import { BedsService } from './beds.service';
import { BedEntity } from './entities/bed.entity';

@Module({
  controllers: [BedsController],
  providers: [BedsService],
  imports: [TypeOrmModule.forFeature([BedEntity])],
})
export class BedsModule {}
