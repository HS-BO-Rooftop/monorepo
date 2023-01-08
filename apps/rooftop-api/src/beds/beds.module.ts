import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfluxDbModule } from '../influx-db/influx-db.module';
import { BedsController } from './beds.controller';
import { BedsService } from './beds.service';
import { BedEntity } from './entities/bed.entity';

@Module({
  controllers: [BedsController],
  providers: [BedsService],
  imports: [TypeOrmModule.forFeature([BedEntity]), InfluxDbModule],
})
export class BedsModule {}
