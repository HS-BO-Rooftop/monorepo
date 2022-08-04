import { ApiNotFoundResponse } from '@nestjs/swagger';

export const RNotFoundResponse = (): MethodDecorator & ClassDecorator => {
  return ApiNotFoundResponse({
    description: 'The requested resource could not be found',
  });
};
