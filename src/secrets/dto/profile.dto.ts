import { IsString, IsUrl } from 'class-validator';

export class ProfileDto implements Profile {
  @IsString({
    always: true,
  })
  openid: string;

  @IsString({
    always: true,
  })
  @IsUrl()
  avatar: string;

  @IsString({
    always: true,
  })
  nickname: string;
}
