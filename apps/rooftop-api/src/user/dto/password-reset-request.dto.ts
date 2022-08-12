import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class PasswordResetRequestDto {
  @ApiProperty({ format: 'email' })
  @IsEmail()
  email: string;
}
