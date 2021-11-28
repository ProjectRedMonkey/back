import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Observable } from 'rxjs';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { HandlerParams } from '../validators/handler-params';
import { HttpInterceptor } from '../interceptors/http.interceptor';

@ApiTags('comments')
@Controller('comments')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class CommentsController {
  constructor(private readonly _commentService: CommentsService) {}

  @ApiOkResponse({
    description: 'Returns the comment for the given "id"',
    type: CommentEntity,
  })
  @ApiNotFoundResponse({
    description: 'comment with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the comment in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':id')
  findOne(@Param() params: HandlerParams): Observable<CommentEntity> {
    return this._commentService.findOneById(params.id);
  }

  @ApiOkResponse({
    description: 'Returns all the comment in the DB',
    type: CommentEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'the DB is empty' })
  @Get()
  findAll(): Observable<CommentEntity[] | void> {
    return this._commentService.findAll();
  }

  @ApiNoContentResponse({ description: 'Successful delete' })
  @ApiNotFoundResponse({
    description: 'Comment with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the comment in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete(':id')
  delete(@Param() params: HandlerParams): Observable<void> {
    return this._commentService.delete(params.id);
  }

  @ApiCreatedResponse({
    description: 'Successful creat"',
    type: CommentEntity,
  })
  @ApiConflictResponse({ description: 'the comment already exists' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiBody({
    description: 'Payload to create a new comment',
    type: CreateCommentDto,
  })
  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
  ): Observable<CommentEntity> {
    return this._commentService.create(createCommentDto);
  }

  @ApiOkResponse({
    description: 'Successful update',
    type: CommentEntity,
  })
  @ApiNotFoundResponse({
    description: 'Comment with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiConflictResponse({ description: 'the comment already exists' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the commment in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Put(':id')
  update(
    @Param() params: HandlerParams,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Observable<CommentEntity> {
    return this._commentService.update(params.id, updateCommentDto);
  }
}
