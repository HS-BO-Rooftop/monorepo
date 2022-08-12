import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ maxLength: 255, format: 'email' })
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({ maxLength: 255 })
  @MaxLength(255)
  password: string;

  @ApiProperty({
    maxLength: 255,
    format: 'uuid',
    description: 'The id of the client that requested the token.',
  })
  @MaxLength(255)
  clientId: string;
}
