import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 将 ConfigService 设为全局可用，这样就能在任何模块中使用而无需再次导入 ConfigModule [citation:2][citation:5][citation:9]
      envFilePath: '.env.local', // 显式指定加载 .env.local 文件 [citation:2][citation:9]
      // 如果需要根据环境加载不同文件，可以传入一个数组，例如：
      // envFilePath: [`.env.${process.env.NODE_ENV}.local`, '.env.local', '.env'], [citation:7]
    }),
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
