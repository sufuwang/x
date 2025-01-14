import {
  IsNumber,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateIf,
  IsArray,
} from 'class-validator';

export class FindTaskQuery {
  @IsOptional()
  @IsString()
  id: number;
}

export default class TaskDto {
  @ValidateIf((o) => o.done)
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  visible: Task['visible'];

  @IsOptional()
  @IsString()
  priority: Task['priority'];

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
  doneDesc: string;

  @ValidateIf((o) => o.done)
  @IsArray()
  doneFileIds: Array<number>;
}

export class PartialTaskDto
  implements Omit<Task, 'registerDate' | 'lastUpdateDate' | 'doneDate'>
{
  @ValidateIf((o) => o.done)
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  openid: string;

  @IsOptional()
  @IsString()
  visible: Task['visible'];

  @IsOptional()
  @IsString()
  priority: Task['priority'];

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
  doneDesc: string;

  @IsOptional()
  @ValidateIf((o) => o.done)
  @IsString()
  doneFileIds: string;
}
