import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorInterfaceEntity } from './entities/sensor-interface.entity';
import { SensorInterfacesController } from './sensor-interfaces.controller';
import { SensorInterfacesService } from './sensor-interfaces.service';

@Module({
  controllers: [SensorInterfacesController],
  providers: [SensorInterfacesService],
  imports: [TypeOrmModule.forFeature([SensorInterfaceEntity])],
  exports: [SensorInterfacesService],
})
export class SensorInterfacesModule {}
