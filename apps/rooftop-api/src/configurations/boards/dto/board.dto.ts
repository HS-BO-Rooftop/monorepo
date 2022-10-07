import { ApiProperty } from '@nestjs/swagger';
import { BedDto } from '../../../beds/dto/bed.dto';
import { PlantDto } from '../../plants/dto/plant.dto';

export class BoardDto {
  @ApiProperty({
    description: 'The id of the board',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the board',
  })
  name: string;

  @ApiProperty({
    description: 'The last time the board was seen',
    nullable: true,
  })
  last_seen_at: Date;

  @ApiProperty({ nullable: true })
  plant_id: string;

  @ApiProperty({ nullable: true })
  bed_id: string;

  @ApiProperty({ type: PlantDto })
  plant: PlantDto;

  @ApiProperty({ type: BedDto, nullable: true })
  bed: PlantDto;
}
