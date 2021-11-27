import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  photo?: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  category?: string;

  @IsDate()
  @IsOptional()
  @IsNotEmpty()
  date?: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  extract?: string[];

  @IsNotEmpty()
  @IsOptional()
  @IsNotEmpty()
  commentsId?: string;
}
