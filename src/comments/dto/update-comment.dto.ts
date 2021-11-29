import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
    example: '11012000',
  })
  @IsNumber()
  @IsNotEmpty()
  date: number;
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
    name: 'text',
    description: 'text of the comment',
    example: '21',
  })
  @IsNotEmpty()
  @IsString()
  text: string;
}
