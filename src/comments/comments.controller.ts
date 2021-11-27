import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Observable } from 'rxjs';
import { Comment } from './comments.types';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly _commentService: CommentsService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Observable<Comment> {
    return this._commentService.findOneById(id);
  }

  @Get()
  findAll(): Observable<Comment[] | void> {
    return this._commentService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<void> {
    return this._commentService.delete(id);
  }

  @Post()
  create(@Body() createBookDto: CreateCommentDto): Observable<Comment> {
    return this._commentService.create(createBookDto);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateCommentDto,
  ): Observable<Comment> {
    return this._commentService.update(id, updateBookDto);
  }
}
