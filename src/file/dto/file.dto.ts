import { IsOptional, IsString, ValidateIf } from 'class-validator';

export class FileDto {
  @IsOptional()
  id: number;

  @IsString()
  @IsOptional()
  parentType: string;

  @IsString()
  @ValidateIf((o) => o.parentType)
  parentId: number;
}
