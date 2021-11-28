import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  id:string;

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
