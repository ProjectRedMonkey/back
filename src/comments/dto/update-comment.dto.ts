import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCommentDto {
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
    description: 'Date of the last update of the comment',
    example: '11/01/2000',
  })
  @IsOptional()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    name: 'upVote',
    description: 'Number of upVote given to the comment',
    example: '12',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  upVote?: number; // see if use

  @ApiProperty({
    name: 'text',
    description: 'Comment content',
    example: 'This part is about madness',
  })
  @IsNotEmpty()
  @IsString()
  text: string;
}
