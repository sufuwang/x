import { IsBoolean, IsOptional, IsString, ValidateIf } from 'class-validator';

export class FindTaskQuery {
  @IsString({
    always: true,
  })
  openid: string;
}

export default class TaskDto
  implements Omit<Task, 'registerDate' | 'lastUpdateDate'>
{
  @IsString()
  openid: string;

  @IsOptional()
  @IsString()
  visible: 'public' | 'onlyMe';

  @IsString()
  catalog: string;

  @IsString()
  title: string;

  @IsString()
  taskDesc: string;

  @IsString()
  deadline: string;

  @IsBoolean()
  @IsOptional()
  done: boolean;

  @ValidateIf((o) => o.done)
  @IsString()
  doneDate: string;

  @ValidateIf((o) => o.done)
  @IsString()
  doneDesc: string;

  @ValidateIf((o) => o.done)
  @IsString()
  doneAttachMent: string;
}
