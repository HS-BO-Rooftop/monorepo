import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordResetRequestDto } from './dto/password-reset-request.dto';
import { SetNewPasswordRequestDto } from './dto/set-new-password-request.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createOne(body);
  }

  @Put('/passwords')
  requestPasswordReset(@Body() body: PasswordResetRequestDto) {
    return this.userService.requestPasswordMail(body.email);
  }

  @Post('passwords')
  setNewPassword(@Body() body: SetNewPasswordRequestDto) {
    return this.userService.setNewPassword(body.code, body.password);
  }
}
