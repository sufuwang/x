import { Controller, Post, Body, Res, Get, Req } from '@nestjs/common';
import type { Request, Response } from 'express';
import { UserService } from './user.service';
import CreateUserDto from './dto/create-user.dto';
import LoginUserDto from './dto/login-user.dto';
import { CookieOptions } from 'src/lib/cookies';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async create(
    @Res({ passthrough: true }) res: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    await this.userService.create(createUserDto);
    return this.login(res, {
      email: createUserDto.email,
      password: createUserDto.password,
    });
  }

  @Post('/login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() loginUserDto: LoginUserDto,
  ) {
    const data = await this.userService.login(loginUserDto);
    res.cookie('access_token', data.access_token, CookieOptions);
    return {
      access_token: data.access_token,
      redirect_url: '/',
    };
  }

  @Get('/auth')
  auth(@Req() req: Request) {
    return this.userService.auth(req.cookies.access_token);
  }
}
