import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof Error) {
          return {
            success: false,
            message: data.message || 'Internal Server Error By Interceptor',
            data: null,
          };
        }
        const response: Record<string, any> = {
          success: true,
          data: data,
          message: 'Success',
        };
        if (Array.isArray(data)) {
          response.total = data.length;
        }
        return response;
      }),
    );
  }
}
