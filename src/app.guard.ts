import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class GlobalGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { openid = '' } = request.headers;

    if (!WhitePage.includes(request.url) && openid.length === 0) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Header 中缺少 openid',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}

const WhitePage = ['/secrets/login'];
