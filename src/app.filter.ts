import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import type { Response } from 'express';

@Catch()
export class AppFilter<T> implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();
    response.status(exception.status).json({
      success: false,
      data: exception.response.message,
      message: exception.response.error,
    });
  }
}
