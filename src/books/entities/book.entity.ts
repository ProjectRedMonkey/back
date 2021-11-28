import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

@Exclude()
export class BookEntity {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '432dc378a38A2323aze87737',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    name: 'photo',
    description: 'url to a picture of the book',
    example: 'https://images-na.ssl-images-amazon.com/images/I/71xwnDO9PBL.jpg',
  })
  @Expose()
  @Type(() => String)
  photo?: string;

  @ApiProperty({
    name: 'title',
    description: 'title of the book',
    example: 'Voyage au bout de la nuit',
  })
  @Expose()
  @Type(() => String)
  title: string;

  @ApiProperty({
    name: 'author',
    description: 'author of the book',
    example: 'Celine',
  })
  @Expose()
  @Type(() => String)
  author: string;

  @ApiProperty({
    name: 'category',
    description: 'categories of this book',
    example: 'philosophy',
  })
  @Expose()
  @Type(() => String)
  category: string;

  @ApiProperty({
    name: 'date',
    description: 'date of publishing of this book',
    example: '11/01/1900',
  })
  @Expose()
  @Type(() => Number)
  date: number;

  @ApiProperty({
    name: 'extract',
    description: 'different extract of this book',
    example: '[il marcher dans la nuit ...] [le soleil se leve avec joi]',
  })
  @Expose()
  @Type(() => String) // or string ?
  extract: string;

  @ApiProperty({
    name: 'commentsId',
    description:
      '[NumExtract][NumComment]list of all the comments of eatch extract',
    example: '[1][2] => 23234342323',
  })
  @Expose()
  @IsOptional()
  @Type(() => String) // or string ?
  commentsId?: string;

  constructor(partial: Partial<BookEntity>) {
    Object.assign(this, partial);
  }
}
