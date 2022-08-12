import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BoardSensorEntity } from '../../entities/configuration.entity';

@Entity({ name: 'board_pins' })
export class BoardPinEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  pin: string;

  @OneToMany(() => BoardSensorEntity, (sensor) => sensor.boardPin)
  sensors: BoardSensorEntity[];
}
