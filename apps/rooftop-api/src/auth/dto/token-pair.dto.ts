import { ApiProperty } from '@nestjs/swagger';

export class TokenPairDto {
  @ApiProperty({
    description: 'The access token issued by the authorization server.',
  })
  access_token: string;

  @ApiProperty({
    description: 'The refresh token for the user',
  })
  refresh_token: string;

  @ApiProperty({
    description: 'The type of token issued as described in the JWT spec.',
  })
  token_type: string;

  @ApiProperty({
    description: 'The number of seconds until the access token expires.',
  })
  expires_in: number;
}
