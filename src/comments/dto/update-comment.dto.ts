import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    name: 'author',
    description: 'author of this comment',
    example: 'nice part',
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
    name: 'upVote',
    description: 'number of upVote for this comment ',
    example: '11',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  upVote?: number;

  @ApiProperty({
    name: 'text',
    description: 'text of the comment',
    example: 'i like this part of the book because ...',
  })
  @IsNotEmpty()
  @IsString()
  text: string;
}
