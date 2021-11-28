import {
  ArrayNotEmpty,
  Contains,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @Contains('.jpg')
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
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  date: number;

  @IsString()
  @IsNotEmpty()
  extract: string;
}
