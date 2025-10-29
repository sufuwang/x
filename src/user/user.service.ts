import { Injectable } from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import LoginUserDto from './dto/login-user.dto';
import { RedisService } from 'src/redis/redis.service';
import { v4 as uuid } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions } from 'src/lib/cookies';

@Injectable()
export class UserService {
  constructor(
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
  ) {}

  getAccessToken(userId: string) {
    return this.jwtService.sign({
      userId,
      domain: CookieOptions.domain,
      salt: Math.floor(Math.random() * Math.pow(10, 12)),
    });
  }

  async create(createUserDto: CreateUserDto) {
    const usersScan = this.redisService.client.scanIterator({
      MATCH: 'users:*',
      COUNT: 100,
    });
    const { value: usedEmails } = await usersScan.next();
    const curUserEmail = `users:${createUserDto.email}`;

    if (Array.isArray(usedEmails)) {
      if (usedEmails.length > 1) {
        throw new Error('已达到创建用户的上限');
      }
      if (usedEmails.includes(curUserEmail)) {
        throw new Error('当前邮箱已被占用');
      }
      for (const key of usedEmails) {
        const username = await this.redisService.client.hGet(key, 'username');
        if (username === createUserDto.username) {
          throw new Error('当前昵称已被占用');
        }
      }
    }

    const userId = uuid();
    await Promise.all([
      ...Object.entries(createUserDto)
        .filter((row) => row[1])
        .map((row) => this.redisService.client.hSet(curUserEmail, ...row)),
      this.redisService.client.hSet(curUserEmail, 'userId', userId),
    ]);

    return {
      access_token: this.getAccessToken(userId),
      directUrl: '/sign-in',
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const curUserEmail = `users:${loginUserDto.email}`;
    const user = await this.redisService.client.hGetAll(curUserEmail);

    if (!user.userId) {
      throw new Error('用户不存在');
    }
    if (user.password !== loginUserDto.password) {
      throw new Error('密码错误');
    }
    return {
      access_token: this.getAccessToken(user.userId),
    };
  }

  auth(accessToken: string | undefined) {
    console.info('cookies: ', accessToken);
    if (!accessToken) {
      return { redirect_url: '/sign-in' };
    }
    const user = this.jwtService.verify(accessToken);
    if (!user) {
      return { redirect_url: '/sign-in' };
    }
    return { data: 'success' };
  }
}
