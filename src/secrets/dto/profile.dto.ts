import { IsString, IsUrl } from 'class-validator';

export class FindProfileQuery {
  @IsString({
    always: true,
  })
  openid: string;
}

export class LoginDto {
  @IsString({
    always: true,
  })
  code: string;
}

export default class ProfileDto implements Omit<Profile, 'openid'> {
  @IsString({
    always: true,
  })
  avatar: string;

  @IsString({
    always: true,
  })
  nickname: string;
}
