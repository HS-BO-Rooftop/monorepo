import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'board_pins' })
export class BoardPinEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  pin: string;
}
