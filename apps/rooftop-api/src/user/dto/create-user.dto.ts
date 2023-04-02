import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

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

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  isAdmin?: boolean;
}
