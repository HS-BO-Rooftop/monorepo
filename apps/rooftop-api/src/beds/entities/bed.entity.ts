import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BoardEntity } from '../../configurations/boards/entities/board.entity';

@Entity('beds')
export class BedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @OneToMany(() => BoardEntity, (board) => board.bed)
  boards: BoardEntity[];
}
