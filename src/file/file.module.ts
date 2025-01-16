import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { SecretsFilesEntity } from './entity/file.entity';
import { FileController } from './file.controller';
import { FileUrlPrefix } from 'src/config';
import { FileService } from './file.service';
import { FileFolderPath } from 'src/config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: FileFolderPath,
      serveRoot: FileUrlPrefix,
    }),
    TypeOrmModule.forFeature([SecretsFilesEntity]),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
