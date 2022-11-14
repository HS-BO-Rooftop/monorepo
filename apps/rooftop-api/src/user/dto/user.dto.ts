import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ format: 'email', maxLength: 255 })
  email: string;

  @ApiProperty({ maxLength: 255 })
  firstName: string;

  @ApiProperty({ maxLength: 255 })
  lastName: string;

  @ApiProperty({ format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ format: 'date-time', nullable: true })
  updatedAt: Date | null;
}
