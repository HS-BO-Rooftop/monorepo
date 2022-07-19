import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { TIME_CONSTANTS } from '../../time-constants';
import { PasswordResetService } from '../password-reset.service';

/**
 * Service Worker that cleans up expired password reset codes every hour
 */
@Injectable()
export class PasswordResetWorkerService {
  private readonly logger = new Logger(PasswordResetWorkerService.name);

  constructor(private readonly passwordResetService: PasswordResetService) {}

  /**
   * Schedules the worker to run every hour
   */
  @Interval(TIME_CONSTANTS.HOUR)
  async cleanUpExpiredCodes() {
    const affected = await this.passwordResetService.cleanupExpiredCodes();
    this.logger.verbose(`Cleaned up ${affected} expired password reset codes`);
  }
}
