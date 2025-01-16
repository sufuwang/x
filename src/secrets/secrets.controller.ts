import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Delete,
  Put,
  Headers,
} from '@nestjs/common';
import { SecretsService } from './secrets.service';
import ProfileDto, { LoginDto } from './dto/profile.dto';
import TaskDto, { FindTaskQuery } from './dto/task.dto';

@Controller('secrets')
export class SecretsController {
  constructor(private readonly secretsService: SecretsService) {}

  @Post('login')
  login(@Body() body: LoginDto): Promise<WX.LoginResponse> {
    return this.secretsService.login(body.code);
  }

  @Get('profile')
  getProfile(@Headers('openid') openid: string): Promise<Profile> {
    return this.secretsService.getProfile(openid);
  }

  @Post('profile')
  editProfile(
    @Headers('openid') openid: string,
    @Body() body: ProfileDto,
  ): Promise<Profile> {
    return this.secretsService.editProfile(openid, body);
  }

  @Get('task')
  getTask(
    @Headers('openid') openid: string,
    @Query() query: FindTaskQuery,
  ): Promise<Task[]> {
    return this.secretsService.getTask(openid, query);
  }

  @Get('task/catalog')
  getTaskCatalogs(@Headers('openid') openid: string): Promise<string[]> {
    return this.secretsService.getTaskCatalogs(openid);
  }

  @Post('task')
  createTask(@Headers('openid') openid: string, @Body() body: TaskDto) {
    return this.secretsService.createTask(openid, body);
  }

  @Put('task')
  updateTask(
    @Headers('openid') openid: string,
    @Body() body: Partial<TaskDto>,
  ) {
    return this.secretsService.updateTask(openid, body);
  }

  @Delete('task')
  deleteTask(@Headers('openid') openid: string, @Query() query: FindTaskQuery) {
    return this.secretsService.deleteTask(openid, query);
  }
}
