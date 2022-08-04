import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SensorInterfaceEntity } from './sensor-interface.entity';
import { SensorTypeEntity } from './sensor-type.entity';

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
  })
  @JoinColumn({ name: 'sensorTypeId' })
  sensorType: SensorTypeEntity;

  @Column('uuid')
  sensorInterfaceId: string;

  @ManyToOne(
    () => SensorInterfaceEntity,
    (sensorInterface) => sensorInterface.sensors,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'sensorInterfaceId' })
  interface: SensorInterfaceEntity;

  @Column({ nullable: true })
  i2cAddress?: number;
}
