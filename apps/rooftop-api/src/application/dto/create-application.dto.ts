import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty({ maxLength: 255 })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ maxLength: 512 })
  @IsString()
  @MaxLength(512)
  description?: string;

  @ApiProperty({ maxLength: 255, format: 'url' })
  @IsUrl()
  @MaxLength(255)
  homepageUrl: string;

  @ApiProperty({ maxLength: 255, format: 'url' })
  @IsUrl()
  @MaxLength(255)
  callbackUrl: string;
}
