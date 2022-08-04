import { ApiInternalServerErrorResponse } from '@nestjs/swagger';

export const RInternalServerErrorResponse = (): MethodDecorator &
  ClassDecorator => {
  return ApiInternalServerErrorResponse({
    description: 'The server encountered an error processing your request',
  });
};
