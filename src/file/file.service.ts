import { Injectable, OnApplicationShutdown, Inject } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SecretsFilesEntity } from './entity/file.entity';
import { FileUrlPrefix } from 'src/config';
import dayjs from 'dayjs';
import { FileDto } from './dto/file.dto';
import { rm } from 'fs/promises';
import { join } from 'path';
import { FileFolderPath } from 'src/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { copyFolder, deleteLastFileOfFolder, makeFolder } from './utils';

@Injectable()
export class FileService implements OnApplicationShutdown {
  @Inject(WINSTON_MODULE_NEST_PROVIDER)
  private logger: Logger;

  constructor(
    @InjectRepository(SecretsFilesEntity)
    private taskFilesRepository: Repository<SecretsFilesEntity>, // @Inject(WINSTON_MODULE_NEST_PROVIDER) // private readonly logger: Logger,
  ) {}

  onApplicationShutdown() {
    this.backup({ force: true });
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  // @Cron(CronExpression.EVERY_5_SECONDS)
  private async backup({ force } = { force: false }) {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    const CachePath = join(__filename, '../../../BACKUP/cache');
    const FilesPath = join(__filename, '../../../BACKUP/files');
    const postfix = force ? '.failure' : '';
    const curDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    this.logger.debug(
      `${force ? `【Force】` : ''}Schedule backup task...`,
      FileService.name,
    );
    Promise.all([
      makeFolder(CachePath),
      makeFolder(FilesPath),
      !force ? deleteLastFileOfFolder(CachePath) : null,
      !force ? deleteLastFileOfFolder(FilesPath) : null,
      copyFolder(
        join(__dirname, '../../.cache'),
        join(__dirname, `../../BACKUP/cache/${curDate}${postfix}.zip`),
      ),
      copyFolder(
        join(__dirname, '../../.files'),
        join(__dirname, `../../BACKUP/files/${curDate}${postfix}.zip`),
      ),
    ]);
  }

  async uploadFiles(openid: string, body: FileDto, files: Array<any>) {
    return Promise.allSettled(
      files.map(async (file) => {
        const row = await this.taskFilesRepository.save<
          Omit<SecretsFilesEntity, 'id'>
        >({
          ...body,
          openid,
          uploadDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          fileName: file.filename,
        });
        return {
          ...row,
          url: `${FileUrlPrefix}/${openid}/${file.filename}`,
        };
      }),
    );
  }

  async getFiles(openid: string, query: Partial<FileDto>) {
    const data = await this.taskFilesRepository.findBy({ openid, ...query });
    return data.map((row) => ({
      ...row,
      url: `${FileUrlPrefix}/${row.openid}/${row.fileName}`,
    }));
  }

  async deleteFiles(openid: string, query: Partial<FileDto>) {
    const rows = await this.taskFilesRepository.findBy({ openid, ...query });
    const data = await Promise.allSettled([
      ...rows
        .map((row) => [
          this.taskFilesRepository.delete(row),
          rm(join(FileFolderPath, `/${row.openid}/${row.fileName}`), {
            recursive: true,
            force: true,
          }),
        ])
        .flat(Infinity),
    ]);
    return rows.map((row, index) => ({
      row,
      result: {
        database: data.slice(index, index + 1),
        file: data.slice(index + 1, index + 2),
      },
    }));
  }
}
