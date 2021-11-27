import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Observable } from 'rxjs';
import { Book } from './books.types';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from "./dto/update-book.dto";

@Controller('books')
export class BooksController {
  constructor(private readonly _bookService: BooksService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Observable<Book> {
    return this._bookService.findOne(id);
  }

  @Get()
  findAll(): Observable<Book[] | void> {
    return this._bookService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<void> {
    return this._bookService.delete(id);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto): Observable<Book> {
    return this._bookService.create(createBookDto);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Observable<Book> {
    return this._bookService.update(id, updateBookDto);
  }
}
