import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'password_reset_codes' })
export class PasswordResetCodeEntity {
  @PrimaryColumn()
  code: string;

  @Column('uuid')
  userId: string;

  @Column('timestamp')
  expiresAt: Date;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  user: UserEntity;
}
