import { Injectable } from '@nestjs/common';
import { RedisService } from './redis/redis.service';

@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService) {}

  async getHello(): Promise<string> {
    await this.redisService.client.set(
      'random_number',
      Math.random().toString(),
    );
    const random_number = await this.redisService.client.get('random_number');
    return `Hello World! ${random_number}`;
  }
}
