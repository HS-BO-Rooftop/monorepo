import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { LessThan, LessThanOrEqual, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { UserEntity } from '../user/entities/user.entity';
import { PasswordResetCodeEntity } from './entities/password-reset-code.entity';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(PasswordResetCodeEntity)
    private readonly repo: Repository<PasswordResetCodeEntity>
  ) {}

  /**
   * Creates a new password reset code for the requested user
   * @param userId ID of the user that requested the password change
   * @returns The generated code
   * @throws Forbidden Exception when the entered code is invalid
   */
  async createOne(userId: string): Promise<string> {
    // Generate code (6 character random string, only upper case letters and numbers)
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Save code to database
    await this.repo.save({
      code,
      userId,
      expiresAt: dayjs().add(3, 'hour').toDate(),
    });

    return code;
  }

  /**
   * Checks if the given code is valid and not expired
   * @param code Code to find
   * @returns The user ID of the user that the code belongs to
   * @throws Forbidden Exception when the entered code is invalid
   */
  async findOne(code: string): Promise<UserEntity> {
    const currentDate = new Date();
    const foundCode = await this.repo.findOne({
      where: {
        code,
        expiresAt: LessThanOrEqual(currentDate),
      },
      relations: {
        user: true,
      },
    });

    if (!foundCode) {
      throw new ForbiddenException();
    }

    return foundCode.user;
  }

  @Transactional()
  async deleteOne(code: string): Promise<void> {
    await this.repo.delete({ code });
  }

  /**
   * Cleans up expired password reset codes
   * @returns Number of cleaned up codes
   */
  async cleanupExpiredCodes(): Promise<number> {
    const currentDate = new Date();
    const cleanedUpCodes = await this.repo.delete({
      expiresAt: LessThan(currentDate),
    });

    return cleanedUpCodes.affected;
  }
}
