import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';

export class TimeRangeRequestDto {
  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  from?: Date;

  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  to?: Date;
}
