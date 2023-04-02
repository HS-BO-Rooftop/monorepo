import { ApiProperty } from "@nestjs/swagger";
import { IsJWT } from "class-validator";

export class RefreshTokenRequestDto {
  @ApiProperty({
    description: 'The refresh token for the user',
  })
  @IsJWT()
  refreshToken: string;
}