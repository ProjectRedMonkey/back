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
    description: 'url to the picture of the book',
    example: 'https://images-na.ssl-images-amazon.com/images/I/71xwnDO9PBL.jpg',
  })
  @Expose()
  @Type(() => String)
  photo?: string;

  @ApiProperty({
    name: 'title',
    description: 'title of the book',
    example: 'Harry Potter',
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
    description: 'category of the book',
    example: 'philosophy',
  })
  @Expose()
  @Type(() => String)
  category: string;

  @ApiProperty({
    name: 'date',
    description: 'Publication date of the book',
    example: '11/01/2000',
  })
  @Expose()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    name: 'extract',
    description: 'Extract of the book for analysis',
    example: 'To be or not to be',
  })
  @Expose()
  @Type(() => String) // or string ?
  extract: string;

  @ApiProperty({
    name: 'page',
    description: 'Page where we can find the extract of the book',
    example: '11',
  })
  @Expose()
  @Type(() => Number)
  page: number;

  constructor(partial: Partial<BookEntity>) {
    Object.assign(this, partial);
  }
}
