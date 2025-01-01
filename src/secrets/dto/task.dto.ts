import { IsBoolean, IsString } from 'class-validator';

export class FindTaskQuery {
  @IsString({
    always: true,
  })
  openid: string;
}

export default class TaskDto implements Task {
  @IsString({
    always: true,
  })
  openid: string;

  @IsString()
  catalog: string;

  @IsString()
  title: string;

  @IsString()
  taskDesc: string;

  @IsString()
  deadline: string;

  @IsString()
  registerDate: string;

  @IsString()
  lastUpdateDate: string;

  @IsBoolean()
  done: boolean;

  @IsString()
  doneDate: string;

  @IsString()
  doneDesc: string;

  @IsString()
  doneAttachMent: string;
}
