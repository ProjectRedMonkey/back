import { IsDate, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    name: 'author',
    description: 'Person who wrote the comment',
    example: 'Charles',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    name: 'date',
    description: 'Publication date of the comment',
    example: '11/01/2000',
  })

  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    name: 'start',
    description: 'index of the start of the part of the text comment',
    example: '2',
  })
  @IsNumber()
  @IsNotEmpty()
  start: number;

  @ApiProperty({
    name: 'end',
    description: 'index of the end of the part of the text comment',
    example: '21',
  })
  @IsNumber()
  @IsNotEmpty()
  end: number;

  @ApiProperty({
    name: 'text',
    description: 'Comment content',
    example: 'This part is about love',
  })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({
    name: 'upVote',
    description: 'Number of upVote given to the comment',
    example: '11',
  })

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  upVote?: number; // see if use

  @ApiProperty({
    name: 'idOfBook',
    description: 'The id of the book commented',
    example: '61a4c0121f102776e2cfa9b2',
  })
  @IsNotEmpty()
  @IsMongoId()
  idOfBook: string;
}
