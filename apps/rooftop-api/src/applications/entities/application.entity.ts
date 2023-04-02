import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'applications' })
export class ApplicationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  homepageUrl: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  callbackUrl: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  secret: string;
}
