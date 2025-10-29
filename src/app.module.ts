import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10m' },
    }),
    ConfigModule.forRoot({
      isGlobal: true, // 将 ConfigService 设为全局可用，这样就能在任何模块中使用而无需再次导入 ConfigModule [citation:2][citation:5][citation:9]
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env.local', '.env'],
    }),
    RedisModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
