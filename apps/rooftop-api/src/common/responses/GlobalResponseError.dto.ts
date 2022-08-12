import { ApiProperty } from '@nestjs/swagger';
import { Request } from 'express';

export class GlobalResponseError {
  @ApiProperty({ description: 'The HTTP status code' })
  statusCode: number;

  @ApiProperty({ description: 'The error message' })
  message: string;

  @ApiProperty({ description: 'The error code' })
  code: string;

  @ApiProperty({
    description: 'The timestamp when the error occurred',
    example: '2020-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  timeStamp: string;

  @ApiProperty({
    description: 'The path of the API endpoint that caused the error',
  })
  path: string;

  @ApiProperty({
    description: 'The HTTP method of the API endpoint that caused the error',
  })
  method: string;

  constructor(
    statusCode: number,
    message: string,
    code: string,
    request: Request
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.code = code;
    this.timeStamp = new Date().toISOString();
    this.path = request.path;
    this.method = request.method;
  }
}
