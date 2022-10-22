import { ApiProperty } from '@nestjs/swagger';
import { BoardDto } from '../../boards/dto/board.dto';

export class PlantDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ maxLength: 100 })
  name_de: string;

  @ApiProperty({ maxLength: 100 })
  name_en: string;

  @ApiProperty({ maxLength: 1024 })
  imageUrl: string;

  @ApiProperty({ type: () => [BoardDto] })
  boards: BoardDto[];
}
