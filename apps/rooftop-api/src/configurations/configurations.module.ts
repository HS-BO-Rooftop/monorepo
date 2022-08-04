import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorsModule } from '../sensors/sensors.module';
import { ConfigurationsController } from './configurations.controller';
import { ConfigurationsService } from './configurations.service';
import { BoardEntity } from './entities/configuration.entity';

@Module({
  controllers: [ConfigurationsController],
  providers: [ConfigurationsService],
  imports: [TypeOrmModule.forFeature([BoardEntity]), SensorsModule],
})
export class ConfigurationsModule {}
