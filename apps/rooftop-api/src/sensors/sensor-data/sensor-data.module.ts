import { Module } from '@nestjs/common';
import { ConfigurationsModule } from '../../configurations/configurations.module';
import { InfluxDbModule } from '../../influx-db/influx-db.module';
import { SensorDataController } from './sensor-data.controller';
import { SensorDataService } from './sensor-data.service';

@Module({
  controllers: [SensorDataController],
  providers: [SensorDataService],
  imports: [InfluxDbModule, ConfigurationsModule],
})
export class SensorDataModule {}
