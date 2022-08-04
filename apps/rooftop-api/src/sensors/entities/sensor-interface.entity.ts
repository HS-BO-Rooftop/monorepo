import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SensorConfigurationEntity } from './sensor.entity';

@Entity({ name: 'sensor_interfaces' })
export class SensorInterfaceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(() => SensorConfigurationEntity, (sensor) => sensor.interface)
  sensors: SensorConfigurationEntity[];
}
