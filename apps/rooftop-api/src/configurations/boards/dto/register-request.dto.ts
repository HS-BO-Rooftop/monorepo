import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, ValidateIf } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({ nullable: true })
  @IsUUID('4')
  @ValidateIf((_, value) => value !== null)
  id: string | null;
}
