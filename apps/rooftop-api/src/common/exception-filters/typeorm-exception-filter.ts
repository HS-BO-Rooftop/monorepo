import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  CannotCreateEntityIdMapError,
  EntityNotFoundError,
  QueryFailedError,
} from 'typeorm';
import { GlobalResponseError } from '../responses/GlobalResponseError.dto';

@Catch()
export class TypeOrmExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message = (exception as any).message;
    let code = 'HttpException';

    Logger.error(
      message,
      (exception as any).stack,
      `${request.method} ${request.url}`
    );

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      status = (exception as HttpException).getStatus();
      if (status === HttpStatus.BAD_REQUEST) {
        // We have a class validator error
        message = (exception as any).response.message;
      }
    } else if (exception instanceof QueryFailedError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = (exception as QueryFailedError).message;
      code = (exception as any).code;

      if (code === '23505') {
        message = 'Duplicate entry';
      } else if (code === '23503') {
        message = 'Foreign key constraint violation';
      } else if (code === '23P02') {
        message = 'Invalid text representation for type';
      }
    } else if (exception instanceof EntityNotFoundError) {
      status = HttpStatus.NOT_FOUND;
      message = (exception as EntityNotFoundError).message;
      code = (exception as any).code;
    } else if (exception instanceof CannotCreateEntityIdMapError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = (exception as CannotCreateEntityIdMapError).message;
      code = (exception as any).code;
    }

    response
      .status(status)
      .json(new GlobalResponseError(status, message, code, request));
  }
}
