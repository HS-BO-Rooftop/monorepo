import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class TimeRangeRequestDto {
  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  from?: Date;

  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  to?: Date;
}
