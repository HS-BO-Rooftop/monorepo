import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorsModule } from '../sensors/sensors.module';
import { ConfigurationsController } from './configurations.controller';
import { ConfigurationsService } from './configurations.service';
import { BoardSensorEntity } from './entities/configuration.entity';
import { PlantsModule } from './plants/plants.module';

@Module({
  controllers: [ConfigurationsController],
  providers: [ConfigurationsService],
  imports: [
    TypeOrmModule.forFeature([BoardSensorEntity]),
    SensorsModule,
    PlantsModule,
  ],
  exports: [ConfigurationsService],
})
export class ConfigurationsModule {}
