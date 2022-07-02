import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenPayload {
  @ApiProperty()
  clientId: string;

  @ApiProperty()
  sub: string;
}

// Typeguard: isRefreshTokenPayload
export function isRefreshTokenPayload(
  value: any
): value is RefreshTokenPayload {
  return (
    value && typeof value.clientId === 'string' && typeof value.sub === 'string'
  );
}
