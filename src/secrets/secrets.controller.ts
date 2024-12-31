import { Body, Controller, Get, Post } from '@nestjs/common';
import { SecretsService } from './secrets.service';
import { ProfileDto } from './dto/profile.dto';

@Controller('secrets')
export class SecretsController {
  constructor(private readonly secretsService: SecretsService) {}

  @Get('profile')
  getProfile(): Profile {
    return this.secretsService.getProfile();
  }

  @Post('profile')
  editProfile(@Body() body: ProfileDto): Profile {
    return this.secretsService.editProfile(body);
  }
}
