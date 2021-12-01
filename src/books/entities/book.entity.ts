import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

@Exclude()
export class BookEntity {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '61a4c0121f102776e2cfa9b2',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    name: 'photo',
    description: 'url to a picture of the book end with jpg or jpeg or jpg or gif or png',
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
    example: '2021-12-01T16:53:10.237Z',
  })
  @Expose()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    name: 'extract',
    description: 'Extract of this book',
    example: 'il marcher dans la nuit ... le soleil se leve avec joi',
  })
  @Expose()
  @Type(() => String)
  extract: string;

  @ApiProperty({
    name: 'page',
    description: 'page of the extract of the book',
    example: '11',
  })
  @Expose()
  @Type(() => Number)
  page: number;

  constructor(partial: Partial<BookEntity>) {
    Object.assign(this, partial);
  }
}
