import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SensorConfigurationEntity } from '../../entities/sensor.entity';

@Entity({ name: 'sensor_types' })
export class SensorTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true, length: 100 })
  name: string;

  @OneToMany(() => SensorConfigurationEntity, (sensor) => sensor.sensorType)
  sensors: SensorConfigurationEntity[];
}
