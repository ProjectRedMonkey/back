import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CommentEntity {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '432dc378a38A2323aze87737',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    name: 'author',
    description: 'author of the comment',
    example: 'Jaque',
  })
  @Expose()
  @Type(() => String)
  author: string;

  @ApiProperty({
    name: 'upVote',
    description: 'number of upVote for this comment ',
    example: '11',
  })
  @Expose()
  @Type(() => Number)
  upVote: number;

  @ApiProperty({
    name: 'date',
    description: 'date of publishing of this comment',
    example: '11/01/1900',
  })
  @Expose()
  @Type(() => Number)
  date: number;

  @ApiProperty({
    name: 'text',
    description: 'text of the comment ',
    example: 'i like this part of the book',
  })
  @Expose()
  @Type(() => String) // or string ?
  text: string;

  @ApiProperty({
    name: 'commentsId',
    description:
      '[NumExtract][NumComment]list of all the comments of eatch extract',
    example: '[1][2] => 23234342323',
  })
  @Expose()
  @Type(() => String) // or string ?
  commentsId?: string;

  @ApiProperty({
    name: 'start',
    description: 'index of the start of the part of the text comment',
    example: '22',
  })
  @Expose()
  @Type(() => Number)
  start: number;

  @ApiProperty({
    name: 'end',
    description: 'index of the end of the part of the text comment',
    example: '21',
  })
  @Expose()
  @Type(() => Number)
  end: number;
  @ApiProperty({
    name: 'idOfBook',
    description: 'the id of the commented book',
    example: '432dc378a38A2323aze87737',
  })
  @Expose()
  @Type(() => String)
  idOfBook: string;

  constructor(partial: Partial<CommentEntity>) {
    Object.assign(this, partial);
  }
}
