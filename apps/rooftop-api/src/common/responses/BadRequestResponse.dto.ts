import { ApiBadRequestResponse, ApiProperty } from '@nestjs/swagger';

export const RBadRequestResponse = (): MethodDecorator & ClassDecorator => {
  return ApiBadRequestResponse({
    description: 'The request was invalid',
    type: ValidationFailedResponseDto,
  });
};

class ValidationFailedResponseDto {
  @ApiProperty({ isArray: true, type: String, example: ['id must be a UUID'] })
  message: string[];

  @ApiProperty({ example: 400 })
  status: number;

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}
