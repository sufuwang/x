import * as fs from 'fs';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppFilter } from './app.filter';
import { AppInterceptor } from './app.interceptor';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: fs.readFileSync('./ssl/sufu.site.key'),
      cert: fs.readFileSync('./ssl/sufu.site_bundle.crt'),
    },
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new AppInterceptor());
  app.useGlobalFilters(new AppFilter());

  const logger = new Logger();
  logger.debug(`process.env.NODE_ENV = ${process.env.NODE_ENV}`, 'Main');

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
