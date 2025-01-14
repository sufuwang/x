import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SecretsFilesEntity } from './entity/file.entity';
import { FileUrlPrefix } from './config';
import dayjs from 'dayjs';
import { FileDto } from './dto/file.dto';
import { unlink } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(SecretsFilesEntity)
    private taskFilesRepository: Repository<SecretsFilesEntity>,
  ) {}

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

  async getFiles(openid: string, query: FileDto) {
    const data = await this.taskFilesRepository.findBy({ openid, ...query });
    return data.map((row) => ({
      ...row,
      url: `${FileUrlPrefix}/${row.openid}/${row.fileName}`,
    }));
  }

  async deleteFiles(openid: string, query: FileDto) {
    const rows = await this.taskFilesRepository.findBy({ openid, ...query });
    const data = await Promise.allSettled([
      ...rows
        .map((row) => [
          this.taskFilesRepository.delete(row),
          unlink(join(__dirname, `../../.files/${row.openid}/${row.fileName}`)),
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
