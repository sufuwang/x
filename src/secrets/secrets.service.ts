import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import TaskEntity from './entity/task.entity';
import ProfileEntity from './entity/profile.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import dayjs from 'dayjs';
import { FindTaskQuery } from './dto/task.dto';
import ProfileDto from './dto/profile.dto';
import { FileService } from 'src/file/file.service';

const __WX_APPID__ = 'wx20deb0404aa253b8';
const __WX_SECRET__ = '8309d1ad3f70408d785bc4a03186def6';

@Injectable()
export class SecretsService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<Task>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<Profile>,
    private readonly httpService: HttpService,
    private readonly fileService: FileService,
  ) {}

  async login(code: string): Promise<WX.LoginResponse> {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${__WX_APPID__}&secret=${__WX_SECRET__}&js_code=${code}&grant_type=authorization_code`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }

  getProfile(openid: Profile['openid']): Promise<Profile> {
    return this.profileRepository.findOneBy({ openid });
  }

  async editProfile(openid: string, body: ProfileDto): Promise<Profile> {
    const profile = await this.getProfile(openid);
    if (profile) {
      await this.profileRepository.update({ openid }, body);
      return this.getProfile(openid);
    }
    return this.profileRepository.save({ ...body, openid });
  }

  async getTaskCatalogs(openid: string) {
    const rows = await this.taskRepository
      .createQueryBuilder('secrets_task')
      .select('secrets_task.catalog', 'catalog')
      .distinct(true)
      .where('secrets_task.openid = :openid', { openid })
      .getRawMany();
    return rows.map((row) => row.catalog);
  }

  getTask(query: FindTaskQuery): Promise<Task[]> {
    if (!query.id) {
      delete query.id;
    }
    return this.taskRepository.findBy(query);
  }

  createTask(openid: string, body): Promise<Task> {
    const registerDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    return this.taskRepository.save({
      ...body,
      openid,
      registerDate,
      lastUpdateDate: registerDate,
    });
  }

  async updateTask(openid: string, body) {
    const lastUpdateDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    if (body.done) {
      const rows = await this.fileService.getFiles(openid, {
        parentId: body.id,
        parentType: 'task',
      });
      await Promise.all(
        rows
          .map((row) => row.id)
          .filter((id) => !body.doneFileIds.includes(id))
          .map((id) => this.fileService.deleteFiles(openid, { id: +id })),
      );
      return this.taskRepository.update(
        { openid, id: body.id },
        {
          ...body,
          lastUpdateDate,
          doneDate: lastUpdateDate,
          doneFileIds: body.doneFileIds.join(','),
        },
      );
    }
    return this.taskRepository.update(
      { openid, id: body.id },
      { ...body, lastUpdateDate, doneFileIds: body.doneFileIds.join(',') },
    );
  }

  deleteTask(query: FindTaskQuery) {
    return this.taskRepository.delete(query);
  }
}
