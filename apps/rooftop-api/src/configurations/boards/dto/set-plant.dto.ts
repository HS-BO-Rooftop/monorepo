import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class SetPlantDto {
  @ApiProperty()
  @IsUUID()
  readonly plantId: string;
}
