import { Controller, Get, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { Observable } from 'rxjs';
import { Book } from './books.types';

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
}
