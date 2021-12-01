import {
  Contains,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    name: 'photo',
    description: 'url of the book\'s picture ',
    example: 'https://images-na.ssl-images-amazon.com/images/I/71xwnDO9PBL.jpg',
  })
  @Contains('.jpg' || '.jpeg' || '.gif' || '.png')
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  photo?: string;

  @ApiProperty({
    name: 'title',
    description: 'title of the book',
    example: 'Harry Potter',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    name: 'author',
    description: 'author of the book',
    example: 'J. K. K. Rowling',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    name: 'category',
    description: 'category of the book',
    example: 'philosophy',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    name: 'date',
    description: 'Publication date of the book',
    example: '11/01/2000',
  })

  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    name: 'page',
    description: 'Page where we can find the extract of the book',
    example: '11',
  })
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ApiProperty({
    name: 'extract',
    description: 'Extract of the book for analysis',
    example: 'To be or not to be',
  })
  @IsString()
  @IsNotEmpty()
  extract: string;
}
