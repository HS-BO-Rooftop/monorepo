import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantEntity } from './entities/plant.entity';
import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';

@Module({
  controllers: [PlantsController],
  providers: [PlantsService],
  imports: [TypeOrmModule.forFeature([PlantEntity])],
})
export class PlantsModule {}
