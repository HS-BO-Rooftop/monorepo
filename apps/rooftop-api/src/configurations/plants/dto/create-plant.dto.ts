import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, MaxLength } from 'class-validator';

export class CreatePlantDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  name_de: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  name_en: string;

  @ApiProperty()
  @IsUrl()
  @MaxLength(1024)
  image_url: string;
}
