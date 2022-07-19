import { Module } from '@nestjs/common';
import { PasswordResetModule } from '../password-reset/password-reset.module';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  imports: [PasswordResetModule],
  exports: [MailService],
})
export class MailModule {}
