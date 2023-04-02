import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { RefreshTokenRequestDto } from './dto/refresh-token-request.dto';
import { TokenPairDto } from './dto/token-pair.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Logs in a user',
    description:
      'Logs in a user using the provided email and password. \nReturns a Token Pair containing the JWT and the refresh token.',
  })
  @ApiCreatedResponse({
    description: 'The token pair',
    type: TokenPairDto,
  })
  async login(@Body() body: LoginRequestDto) {
    return this.authService.loginUser(body.email, body.password, body.clientId);
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Refreshes a token pair',
    description:
      'Refreshes a token pair using the provided refresh token. \nReturns a Token Pair containing the JWT and the refresh token.',
  })
  @ApiCreatedResponse({
    description: 'The token pair',
    type: TokenPairDto,
  })
  async refresh(@Body() body: RefreshTokenRequestDto) {
    return this.authService.refreshToken(body.refreshToken);
  }
}
