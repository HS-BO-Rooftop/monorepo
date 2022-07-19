import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetCodeEntity } from './entities/password-reset-code.entity';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetWorkerService } from './password-reset-worker/password-reset-worker.service';

@Module({
  providers: [PasswordResetService, PasswordResetWorkerService],
  imports: [TypeOrmModule.forFeature([PasswordResetCodeEntity])],
  exports: [PasswordResetService],
})
export class PasswordResetModule {}
