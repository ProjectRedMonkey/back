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
    description: 'url of the Book picture ',
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
    example: 'Voyage au bout de la nuit',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    name: 'author',
    description: 'author of the book',
    example: 'Celine',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    name: 'category',
    description: 'categories of this book',
    example: 'philosophy',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    name: 'date',
    description: 'date of publishing of this book',
    example: '11012000',
  })

  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    name: 'page',
    description: 'page of the extract of the book',
    example: '11',
  })
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ApiProperty({
    name: 'extract',
    description: 'different extract of this book',
    example: '[il marcher dans la nuit ...] [le soleil se leve avec joi]',
  })
  @IsString()
  @IsNotEmpty()
  extract: string;
}
