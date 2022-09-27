import { Module } from '@nestjs/common';
import { InfluxDbService } from './influx-db.service';

@Module({
  providers: [InfluxDbService],
  exports: [InfluxDbService],
})
export class InfluxDbModule {}
