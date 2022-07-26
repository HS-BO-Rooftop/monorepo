import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @MaxLength(255)
  @ApiProperty({ format: 'email', maxLength: 255 })
  email: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({ maxLength: 255 })
  password: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({ maxLength: 255 })
  firstName: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty({ maxLength: 255 })
  lastName: string;
}
