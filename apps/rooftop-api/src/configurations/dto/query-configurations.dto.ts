import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class QueryConfigurationsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  connectedOnly?: boolean;
}
