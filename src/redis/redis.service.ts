// redis.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  public client: RedisClientType;

  constructor() {
    // 创建 Redis 客户端实例
    this.client = createClient({
      url: process.env.REDIS_URL,
    });

    // 监听错误事件
    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    this.client.on('connect', () => {
      console.log('Redis Client Connected');
    });
  }

  async onModuleInit() {
    // 在模块初始化时连接 Redis
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  async onModuleDestroy() {
    // 在模块销毁时断开连接
    if (this.client.isOpen) {
      await this.client.disconnect();
    }
  }

  // 提供获取客户端的方法
  getClient(): RedisClientType {
    return this.client;
  }
}
