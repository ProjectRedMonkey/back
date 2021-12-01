import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CommentEntity {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier in the database',
    example: '61a4c0121f102776e2cfa9b2',
  })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({
    name: 'author',
    description: 'author of the comment',
    example: 'Charles',
  })
  @Expose()
  @Type(() => String)
  author: string;

  @ApiProperty({
    name: 'upVote',
    description: 'Number of upVote given to the comment',
    example: '11',
  })
  @Expose()
  @Type(() => Number)
  upVote: number;

  @ApiProperty({
    name: 'date',
    description: 'Publication date or last update of the comment',
    example: '11/01/2000',
  })
  @Expose()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    name: 'text',
    description: 'Comment content',
    example: 'It\'s about love',
  })
  @Expose()
  @Type(() => String) // or string ?
  text: string;

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
    example: '61a4c0121f102776e2cfa9b2',
  })
  @Expose()
  @Type(() => String)
  idOfBook: string;

  constructor(partial: Partial<CommentEntity>) {
    Object.assign(this, partial);
  }
}
