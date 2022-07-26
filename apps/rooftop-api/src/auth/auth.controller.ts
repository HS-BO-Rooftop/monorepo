import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';

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
  async login(@Body() body: LoginRequestDto) {
    return this.authService.loginUser(body.email, body.password, body.clientId);
  }
}
