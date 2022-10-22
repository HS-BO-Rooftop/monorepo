import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BedEntity } from '../../../beds/entities/bed.entity';
import { PlantEntity } from '../../plants/entities/plant.entity';

@Entity({ name: 'boards' })
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 100 })
  name: string;

  @Column({ nullable: true })
  last_seen_at: Date;

  @Column('uuid', { nullable: true })
  plant_id: string;

  @ManyToOne(() => PlantEntity, (plant) => plant.boards, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'plant_id' })
  plant: PlantEntity;

  @Column('uuid', { nullable: true })
  bed_id: string;

  @ManyToOne(() => BedEntity, (bed) => bed.boards, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'bed_id' })
  bed: BedEntity;
}
