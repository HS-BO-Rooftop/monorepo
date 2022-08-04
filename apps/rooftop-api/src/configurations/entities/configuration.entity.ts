import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SensorConfigurationEntity } from '../../sensors/entities/sensor.entity';

@Entity({ name: 'boards' })
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  deviceId: string;

  @Column({ nullable: true })
  deviceName?: string;
}

@Entity({ name: 'board_pins' })
export class BoardPinEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: false })
  pin: string;
}

@Entity({ name: 'board_sensors' })
export class BoardSensorEntity {
  @PrimaryColumn('uuid')
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
