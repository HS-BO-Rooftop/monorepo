import { ApiNotFoundResponse, ApiResponseOptions } from '@nestjs/swagger';

export const RNotFoundResponse = (
  options?: ApiResponseOptions
): MethodDecorator & ClassDecorator => {
  return ApiNotFoundResponse({
    description: options?.description || 'The requested resource was not found',
    ...options,
  });
};
