import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import ResponseDto from './response.dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<ResponseDto>();

    return next.handle().pipe(
      map((data) => {
        // 如果已经是AuthResponseDto格式，直接返回
        if (data instanceof ResponseDto) {
          return data;
        }

        // 统一包装响应
        return ResponseDto.success(data, '请求成功', response.statusCode);
      }),
    );
  }
}
