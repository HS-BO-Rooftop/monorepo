import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'boards' })
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  last_seen_at: Date;
}
