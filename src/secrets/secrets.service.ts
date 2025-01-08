import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import TaskEntity from './entity/task.entity';
import ProfileEntity from './entity/profile.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import dayjs from 'dayjs';
import TaskDto, { DeleteTaskQuery, PartialTaskDto } from './dto/task.dto';

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
  ) {}

  async login(code: string): Promise<WX.LoginResponse> {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${__WX_APPID__}&secret=${__WX_SECRET__}&js_code=${code}&grant_type=authorization_code`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }

  getProfile(openid: Profile['openid']): Promise<Profile> {
    return this.profileRepository.findOneBy({ openid });
  }

  async editProfile(body: Profile): Promise<Profile> {
    const profile = await this.getProfile(body.openid);
    if (profile) {
      await this.profileRepository.update({ openid: body.openid }, body);
      return this.getProfile(body.openid);
    }
    return this.profileRepository.save(body);
  }

  getTask(openid: Task['openid']): Promise<Task[]> {
    return this.taskRepository.findBy({ openid });
  }

  createTask(body: TaskDto): Promise<Task> {
    const registerDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    return this.taskRepository.save<Task>({
      ...body,
      registerDate,
      lastUpdateDate: registerDate,
    });
  }

  patchTask(body: PartialTaskDto) {
    return this.taskRepository.update(
      { id: body.id, openid: body.openid },
      { ...body, lastUpdateDate: dayjs().format('YYYY-MM-DD HH:mm:ss') },
    );
  }

  deleteTask(query: DeleteTaskQuery) {
    return this.taskRepository.delete(query);
  }
}
