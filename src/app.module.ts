import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecretsModule } from './secrets/secrets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局配置，无需在每个模块中重新引入
      envFilePath: '.env', // 指定环境变量文件路径
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'sso',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 自动加载实体
      synchronize: true, // 开发环境下自动同步表结构
      charset: 'utf8mb4_unicode_ci',
      // type: 'mysql',
      // host: process.env.DATABASE_HOST,
      // port: +process.env.DATABASE_PORT,
      // username: process.env.DATABASE_USER,
      // password: process.env.DATABASE_PASSWORD,
      // database: 'sso',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], // 自动加载实体
      // synchronize: true, // 开发环境下自动同步表结构
      // charset: 'utf8mb4_unicode_ci',
    }),
    SecretsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
