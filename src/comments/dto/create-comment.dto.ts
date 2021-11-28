import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  idBook:string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsNumber()
  date?: number;

  @IsNotEmpty()
  @IsNumber()
  start: number;

  @IsNotEmpty()
  @IsNumber()
  end: number;

  @IsNotEmpty()
  @IsString()
  text: string;
}
