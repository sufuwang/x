import { Injectable } from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class UserService {
  constructor(private readonly redisService: RedisService) {}
  

  async create(createUserDto: CreateUserDto) {
    const usersScan = this.redisService.client.scanIterator({
      MATCH: "users:*",
      COUNT: 100,
    });
    const { value: userNames } = await usersScan.next()
    const key = `users:${createUserDto.username}`

    if (Array.isArray(userNames)) {
      if (userNames.length > 2) {
        throw new Error('已达到创建用户的上限');
      } else if (userNames.includes(key)) {
        throw new Error('当前昵称已被占用');
      }
      const isUsedEmail = userNames.find(async name => {
        const email = await this.redisService.client.hGet(`users:${name}`, 'email')
        return email === createUserDto.email
      })
      if (isUsedEmail) {
        throw new Error('当前邮箱已被占用');
      }
    }

    await Promise.all(Object.entries(createUserDto)
      .filter(row => row[1])
      .map(row => {
        this.redisService.client.hSet(key, ...row)
      }))

    return createUserDto;
  }
}
