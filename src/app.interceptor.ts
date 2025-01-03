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
            message: data.message || 'Internal Server Error',
            data: null,
          };
        }
        return {
          success: true,
          data: data,
          message: 'Success',
        };
      }),
    );
  }
}
