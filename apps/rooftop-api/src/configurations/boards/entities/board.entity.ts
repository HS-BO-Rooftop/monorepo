import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlantEntity } from '../../plants/entities/plant.entity';

@Entity({ name: 'boards' })
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
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
}
