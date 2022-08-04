import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FindByUUIDDto {
  @ApiProperty({
    format: 'uuid',
    description: 'The UUID of the requested resource',
  })
  @IsUUID('4')
  id: string;
}
