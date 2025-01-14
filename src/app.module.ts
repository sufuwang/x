import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecretsModule } from './secrets/secrets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局配置，无需在每个模块中重新引入
      envFilePath: '.env', // 指定环境变量文件路径
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST ?? 'localhost',
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USER ?? 'root',
      password: process.env.MYSQL_PASSWORD ?? '123456',
      database: process.env.MYSQL_DB ?? 'sso',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 自动加载实体
      synchronize: true, // 开发环境下自动同步表结构
      charset: 'utf8mb4_unicode_ci',
    }),
    SecretsModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
