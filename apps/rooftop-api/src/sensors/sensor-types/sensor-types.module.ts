import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorTypeEntity } from './entities/sensor-type.entity';
import { SensorTypesController } from './sensor-types.controller';
import { SensorTypesService } from './sensor-types.service';

@Module({
  controllers: [SensorTypesController],
  providers: [SensorTypesService],
  imports: [TypeOrmModule.forFeature([SensorTypeEntity])],
  exports: [SensorTypesService],
})
export class SensorTypesModule {}
