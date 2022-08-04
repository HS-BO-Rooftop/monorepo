import { Module } from '@nestjs/common';
import { SensorTypesService } from './sensor-types.service';
import { SensorTypesController } from './sensor-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorTypeEntity } from './entities/sensor-type.entity';

@Module({
  controllers: [SensorTypesController],
  providers: [SensorTypesService],
  imports: [TypeOrmModule.forFeature([SensorTypeEntity])],
})
export class SensorTypesModule {}
