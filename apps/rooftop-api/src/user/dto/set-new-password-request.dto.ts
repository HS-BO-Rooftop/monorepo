import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class SetNewPasswordRequestDto extends PickType(CreateUserDto, [
  'password',
]) {
  @ApiProperty()
  @IsString()
  code: string;
}
