import { ApiProperty } from '@nestjs/swagger';

export class BoardPinDto {
  @ApiProperty({ description: 'The id of the board pin', uniqueItems: true })
  id: string;

  @ApiProperty({
    description: 'The name of the pin',
    uniqueItems: true,
    maxLength: 10,
  })
  pin: string;
}
