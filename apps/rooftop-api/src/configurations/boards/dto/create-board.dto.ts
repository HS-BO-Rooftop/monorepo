import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty({
    description: 'The name of the board',
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    format: 'uuid',
    description: 'The plant associated with the board',
    maxLength: 255,
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  plant_id?: string | null;

  @ApiPropertyOptional({
    format: 'uuid',
    description: 'The bed associated with the board',
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  bed_id?: string | null;
}
