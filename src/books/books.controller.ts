import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { mergeMap, Observable } from 'rxjs';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import * as Config from 'config';
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
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { BookEntity } from './entities/book.entity';
import { HandlerParams } from '../validators/handler-params';
import { HttpService } from '@nestjs/axios';
import { AppConfig } from '../app.types';

@ApiTags('books')
@Controller('books')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export class BooksController {
  constructor(
    private readonly _bookService: BooksService,
    private httpService: HttpService,
  ) {}

  @ApiOkResponse({
    description: 'Returns the book for the given "id"',
    type: BookEntity,
  })
  @ApiNotFoundResponse({
    description: 'Book with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the book in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':id')
  findOne(@Param() params: HandlerParams): Observable<BookEntity> {
    return this._bookService.findOne(params.id);
  }

  @ApiOkResponse({
    description: 'Returns all the book in the DB',
    type: BookEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'the DB is empty' })
  @Get()
  findAll(): Observable<BookEntity[] | void> {
    return this._bookService.findAll();
  }

  @ApiNoContentResponse({ description: 'Successful delete' })
  @ApiNotFoundResponse({
    description: 'Book with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the book in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete(':id')
  delete(@Param() params: HandlerParams): Observable<void> {
    Logger.log(
      'zeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee: ' +
        params.id,
    );

    const s =
      `http://${Config.get<AppConfig>('serverComments').host}:${
        Config.get<AppConfig>('serverComments').port
      }/comments/allBooks/`;
    Logger.log(
      'zeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeaaaaaaaaaaaee: ' + s,
    );
    this.findOne(params).pipe(
      mergeMap((b: BookEntity) => this.httpService.delete(s + b.id)),
    );

    return this._bookService.delete(params.id);
  }
  @ApiCreatedResponse({
    description: 'Successful creat"',
    type: BookEntity,
  })
  @ApiConflictResponse({ description: 'the book already exists' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiBody({
    description: 'Payload to create a new book',
    type: CreateBookDto,
  })
  @Post()
  create(@Body() createBookDto: CreateBookDto): Observable<BookEntity> {
    return this._bookService.create(createBookDto);
  }

  @ApiOkResponse({
    description: 'Successful update',
    type: BookEntity,
  })
  @ApiNotFoundResponse({
    description: 'Book with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiConflictResponse({ description: 'the book already exists' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the book in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Put(':id')
  update(
    @Param() params: HandlerParams,
    @Body() updateBookDto: UpdateBookDto,
  ): Observable<BookEntity> {
    return this._bookService.update(params.id, updateBookDto);
  }
}
