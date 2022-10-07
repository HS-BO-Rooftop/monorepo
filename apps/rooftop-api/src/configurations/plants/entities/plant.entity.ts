import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BoardEntity } from '../../boards/entities/board.entity';

@Entity('plants')
export class PlantEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name_de: string;

  @Column({ nullable: false })
  name_en: string;

  @Column({ nullable: false, length: 1024 })
  image_url: string;

  @OneToMany(() => BoardEntity, (board) => board.plant, {
    onDelete: 'SET NULL',
  })
  boards: BoardEntity[];
}
