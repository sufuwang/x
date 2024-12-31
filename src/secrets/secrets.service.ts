import { Injectable } from '@nestjs/common';

@Injectable()
export class SecretsService {
  getProfile(): Profile {
    return { openid: '', avatar: '', nickname: '' };
  }

  editProfile(body: Profile): Profile {
    return { ...body, avatar: 'x', nickname: 'x' };
  }
}
