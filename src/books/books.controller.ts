import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor, ConflictException,
  Controller,
  Delete,
  Get, Logger,
  Param,
  Post,
  Put,
  UseInterceptors
} from "@nestjs/common";
import { BooksService } from "./books.service";
import { Observable, of, throwError } from "rxjs";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import * as Config from "config";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags
} from "@nestjs/swagger";
import { HttpInterceptor } from "../interceptors/http.interceptor";
import { BookEntity } from "./entities/book.entity";
import { HandlerParams } from "../validators/handler-params";
import { HttpService } from "@nestjs/axios";
import { map, tap } from "rxjs/operators";

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
  @ApiBadRequestResponse({ description: 'Parameter provided is wrong' })
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
    description: 'Returns all books in the DB',
    type: BookEntity,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'the DB is empty' })
  @Get()
  findAll(): Observable<BookEntity[] | void> {
    return this._bookService.findAll();
  }

  @ApiNoContentResponse({ description: 'Successful deletion' })
  @ApiNotFoundResponse({
    description: 'Book with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is wrong' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the book in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete(':id')
  delete(@Param() params: HandlerParams): Observable<void> {
    const s = `http://${Config.get<string>('serverComments').host}:${
      Config.get<string>('serverComments').port
    }/comments/allBooks/`;
    this.httpService.delete(s + params.id).subscribe(() => undefined);
    return this._bookService.delete(params.id);
  }
  @ApiCreatedResponse({
    description: 'Successful creation"',
    type: BookEntity,
  })
  @ApiConflictResponse({ description: 'The book already exists' })
  @ApiBadRequestResponse({ description: 'Parameter provided is wrong' })
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
  @ApiBadRequestResponse({ description: 'Parameter provided is wrong' })
  @ApiConflictResponse({ description: 'The book already exists' })
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
    const s = `http://${Config.get<string>('serverComments').host}:${
      Config.get<string>('serverComments').port
    }/comments/up/`;
    const l: string[] = updateBookDto.extract.split('//');
    if(l.length != 2){
      throwError( () => new BadRequestException(`we need a sting slip with: new // old`))
    }
    const old = l[1];
    updateBookDto.extract = l[0];
    Logger.log(updateBookDto.extract + ' azezeaz');
    return this._bookService.update(params.id, updateBookDto).pipe(
      tap((c: BookEntity) =>
        this.httpService
          .put(s + params.id, [
            c.extract,
            old,
          ])
          .subscribe(() => undefined),
      ),
      map((c: BookEntity) => c),
    );
  }
}
