import { ApiProperty } from '@nestjs/swagger';

export class DwdHistoricWeatherRow {
  @ApiProperty({ nullable: true })
  wind_speed: number | null;

  @ApiProperty({ nullable: true })
  precipitation: number | null;

  @ApiProperty({ nullable: true })
  wind_direction: number | null;

  @ApiProperty({ nullable: true })
  temperature: number | null;
}
