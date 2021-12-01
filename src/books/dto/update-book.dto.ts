import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiProperty({
    name: 'photo',
    description: 'url of the Book picture ',
    example: 'https://images-na.ssl-images-amazon.com/images/I/71xwnDO9PBL.jpg',
  })
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
    name: 'page',
    description: 'Page where we can find the extract of the book',
    example: '11',
  })
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  page?: number;

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
    description: 'category of the book',
    example: 'philosophy',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  category?: string;

  @ApiProperty({
    name: 'date',
    description: 'Publication date of the book',
    example: '11/01/2000',
  })

  @IsOptional()
  @IsNotEmpty()
  date?: Date;

  @ApiProperty({
    name: 'extract',
    description: 'Extract of the book for analysis',
    example: 'To be or not to be',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  extract?: string;
}
