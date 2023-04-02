import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { FindByUUIDDto } from '../common/dto/find-by-uuid.dto';
import { RInternalServerErrorResponse } from '../common/responses/InternalServierErrorResponse.dto';
import { RNotFoundResponse } from '../common/responses/NotFoundResponse.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordResetRequestDto } from './dto/password-reset-request.dto';
import { SetNewPasswordRequestDto } from './dto/set-new-password-request.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
@RInternalServerErrorResponse()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users', operationId: 'getAllUser' })
  @ApiOkResponse({ type: UserDto, isArray: true })
  getAllUsers() {
    return this.userService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id', operationId: 'getUserById' })
  @ApiOkResponse({ type: UserDto })
  getUser(@Param() params: FindByUUIDDto) {
    return this.userService.findOne(params.id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @SetMetadata('roles', ['admin'])
  @ApiOperation({ summary: 'Create user', operationId: 'createUser' })
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createOne(body);
  }

  @Put('/passwords')
  requestPasswordReset(@Body() body: PasswordResetRequestDto) {
    return this.userService.requestPasswordMail(body.email);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user', operationId: 'updateUser' })
  @ApiOkResponse({ type: UserDto })
  updateUser(@Param() params: FindByUUIDDto, @Body() body: UpdateUserDto) {
    return this.userService.updateOne(params.id, body);
  }

  @Post('passwords')
  setNewPassword(@Body() body: SetNewPasswordRequestDto) {
    return this.userService.setNewPassword(body.code, body.password);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @RNotFoundResponse()
  @ApiOperation({ summary: 'Deletes a user', operationId: 'deleteUser' })
  deleteUser(@Param() params: FindByUUIDDto) {
    return this.userService.deleteOne(params.id);
  }
}
