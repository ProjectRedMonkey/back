import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    name: 'author',
    description: 'author of this comment',
    example: 'Charles',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    name: 'date',
    description: 'date of the comment',
    example: '2021-12-01T16:53:10.237Z',
  })
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    name: 'start',
    description: 'index of the start of the part of the text comment',
    example: '22',
  })
  @IsNumber()
  @IsNotEmpty()
  start: number;

  @ApiProperty({
    name: 'end',
    description: 'index of the end of the part of the text comment',
    example: '28',
  })
  @IsNumber()
  @IsNotEmpty()
  end: number;

  @ApiProperty({
    name: 'text',
    description: 'text of the comment',
    example: 'i like this part of the book because ...',
  })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({
    name: 'upVote',
    description: 'number of upVote for this comment ',
    example: '11',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  upVote?: number; // see if use

  @ApiProperty({
    name: 'idOfBook',
    description: 'the id of the book commented',
    example: '61a4c0121f102776e2cfa9b2',
  })
  @IsNotEmpty()
  @IsMongoId()
  idOfBook: string;
}
