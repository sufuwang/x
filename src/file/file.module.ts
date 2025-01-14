import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecretsFilesEntity } from './entity/file.entity';
import { FileController } from './file.controller';
import { FileUrlPrefix } from './config';
import { FileService } from './file.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', '.files'),
      serveRoot: FileUrlPrefix,
    }),
    TypeOrmModule.forFeature([SecretsFilesEntity]),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
