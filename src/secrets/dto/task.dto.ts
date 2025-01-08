import {
  IsNumber,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class FindTaskQuery {
  @IsString()
  openid: string;
}

export class DeleteTaskQuery extends FindTaskQuery {
  @IsString()
  id: number;
}

export default class TaskDto
  implements Omit<Task, 'registerDate' | 'lastUpdateDate'>
{
  @IsOptional()
  @IsNumber()
  id: number;

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

export class PartialTaskDto
  implements Omit<Task, 'registerDate' | 'lastUpdateDate'>
{
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  openid: string;

  @IsOptional()
  @IsString()
  visible: 'public' | 'onlyMe';

  @IsOptional()
  @IsString()
  catalog: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  taskDesc: string;

  @IsOptional()
  @IsString()
  deadline: string;

  @IsBoolean()
  @IsOptional()
  done: boolean;

  @IsOptional()
  @ValidateIf((o) => o.done)
  @IsString()
  doneDate: string;

  @IsOptional()
  @ValidateIf((o) => o.done)
  @IsString()
  doneDesc: string;

  @IsOptional()
  @ValidateIf((o) => o.done)
  @IsString()
  doneAttachMent: string;
}
