import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecretsModule } from './secrets/secrets.module';

@Module({
  imports: [SecretsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
