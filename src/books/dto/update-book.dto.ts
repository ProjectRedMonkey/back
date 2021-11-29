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
    description: 'page of the extract of the book',
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
    description: 'categories of this book',
    example: 'philosophy',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  category?: string;

  @ApiProperty({
    name: 'date',
    description: 'date of publishing of this book',
    example: '11012000',
  })
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  date?: number;

  @ApiProperty({
    name: 'extract',
    description: 'different extract of this book',
    example: 'il marcher dans la nuit ...]le soleil se leve avec joi',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  extract?: string;
  /*
  @ApiProperty({
    name: 'commentsId',
    description:
      '[NumExtract][NumComment]list of all the comments of eatch extract',
    example: '61a4c0121f102776e2cfa9b2',
  })
  @IsMongoId()
  @IsOptional()
  @IsNotEmpty()
  commentsId?: string;
*/
}
