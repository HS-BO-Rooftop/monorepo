import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SensorConfigurationEntity } from '../../sensors/entities/sensor.entity';
import { BoardPinEntity } from '../board-pins/entities/board-pin.entity';
import { BoardEntity } from '../boards/entities/board.entity';

@Entity({ name: 'board_sensors' })
export class BoardSensorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  deviceId: string;

  @Column('uuid')
  sensorId: string;

  @Column()
  isConnected: boolean;

  @Column()
  pinId: string;

  @ManyToOne(() => BoardPinEntity, { nullable: true })
  @JoinColumn({ name: 'pinId' })
  boardPin: BoardPinEntity;

  @ManyToOne(() => SensorConfigurationEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sensorId' })
  sensor: SensorConfigurationEntity;

  @ManyToOne(() => BoardEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'deviceId' })
  board: BoardEntity;
}
