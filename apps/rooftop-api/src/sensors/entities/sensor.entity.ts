import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardSensorEntity } from '../../configurations/entities/configuration.entity';
import { SensorInterfaceEntity } from '../sensor-interfaces/entities/sensor-interface.entity';
import { SensorTypeEntity } from '../sensor-types/entities/sensor-type.entity';

@Entity({ name: 'sensor_configurations' })
export class SensorConfigurationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column('uuid')
  sensorTypeId: string;

  @ManyToOne(() => SensorTypeEntity, (sensorType) => sensorType.sensors, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'sensorTypeId' })
  sensorType: SensorTypeEntity;

  @Column('uuid')
  sensorInterfaceId: string;

  @ManyToOne(
    () => SensorInterfaceEntity,
    (sensorInterface) => sensorInterface.sensors,
    { onDelete: 'CASCADE', eager: true }
  )
  @JoinColumn({ name: 'sensorInterfaceId' })
  interface: SensorInterfaceEntity;

  @Column({ nullable: true })
  i2cAddress?: number;

  @OneToMany(() => BoardSensorEntity, (boardSensor) => boardSensor.sensor)
  boardSensors: BoardSensorEntity[];
}
