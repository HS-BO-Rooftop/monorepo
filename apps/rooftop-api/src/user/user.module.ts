import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailModule } from '../mail/mail.module';
import { PasswordResetModule } from '../password-reset/password-reset.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MailModule,
    PasswordResetModule,
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
