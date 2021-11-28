import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
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
    example: '21',
  })
  @IsNumber()
  @IsNotEmpty()
  end: number;

  @ApiProperty({
    name: 'text',
    description: 'text of the comment',
    example: '21',
  })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({
    name: 'idOfBook',
    description: 'the id of the book commented',
    example: '244242325224',
  })
  @IsNotEmpty()
  @IsMongoId()
  idOfBook: string;
}
