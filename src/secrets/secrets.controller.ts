import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { SecretsService } from './secrets.service';
import ProfileDto, { FindProfileQuery, LoginDto } from './dto/profile.dto';
import TaskDto, {
  FindTaskQuery,
  DeleteTaskQuery,
  PartialTaskDto,
} from './dto/task.dto';

@Controller('secrets')
export class SecretsController {
  constructor(private readonly secretsService: SecretsService) {}

  @Post('login')
  login(@Body() body: LoginDto): Promise<WX.LoginResponse> {
    return this.secretsService.login(body.code);
  }

  @Get('profile')
  getProfile(@Query() query: FindProfileQuery): Promise<Profile> {
    return this.secretsService.getProfile(query.openid);
  }

  @Post('profile')
  editProfile(@Body() body: ProfileDto): Promise<Profile> {
    return this.secretsService.editProfile(body);
  }

  @Get('task')
  getTask(@Query() query: FindTaskQuery): Promise<Task[]> {
    return this.secretsService.getTask(query.openid);
  }

  @Post('task')
  createTask(@Body() body: TaskDto): Promise<Task> {
    return this.secretsService.createTask(body);
  }

  @Patch('task')
  patchTask(@Body() body: PartialTaskDto) {
    return this.secretsService.patchTask(body);
  }

  @Delete('task')
  deleteTask(@Query() query: DeleteTaskQuery) {
    return this.secretsService.deleteTask(query);
  }
}
