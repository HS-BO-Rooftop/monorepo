import { ApiProperty } from '@nestjs/swagger';

export class BoardDto {
  @ApiProperty({
    description: 'The id of the board',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the board',
  })
  name: string;
}
