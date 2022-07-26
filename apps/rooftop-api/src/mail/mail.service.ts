import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { PasswordResetService } from '../password-reset/password-reset.service';
import { UserEntity } from '../user/entities/user.entity';
import { Mail } from './mails/mail';
import { PasswordResetMail } from './mails/password-reset.mail';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly passwordResetService: PasswordResetService
  ) {}

  async sendResetPasswordEmail(user: UserEntity): Promise<void> {
    // Generate a new code
    const code = await this.passwordResetService.createOne(user.id);

    // Send email
    const mail = new PasswordResetMail(
      'password-reset',
      'Passwort zurücksetzen',
      user.email,
      {
        user,
        code,
      }
    );

    this.logger.verbose(`Sending password reset email to ${user.email}`);
    await this.sendMail(mail);
  }

  private async sendMail(mail: Mail<unknown>): Promise<void> {
    // Send email
    await this.mailerService.sendMail({
      to: mail.to,
      subject: mail.subject,
      text: mail.toText(),
      template: mail.templateName,
      context: mail.data,
    });
  }
}
