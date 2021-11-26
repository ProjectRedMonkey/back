import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './books.types';
import { BOOKS } from '../data/book';
import { find, from, map, mergeMap, Observable, of, throwError } from 'rxjs';

@Injectable()
export class BooksService {
  private _book: Book[];

  constructor() {
    this._book = [].concat(BOOKS).map((book) => ({
      ...book,
      date: this._parseDate(book.date),
    }));
  }

  findOne = (id: string): Observable<Book> =>
    from(this._book).pipe(
      find((b: Book) => b.id === id),
      mergeMap((b: Book) =>
        !!b
          ? of(b)
          : throwError(() => new NotFoundException(`No Book with id'${id}'.`)),
      ),
    );

  findAll = (): Observable<Book[] | void> =>
    of(this._book).pipe(
      map((books: Book[]) => (!!books && !!books.length ? books : undefined)),
    );

  private _parseDate = (date: string): number => {
    const dates = date.split('/');
    return new Date(dates[2] + '/' + dates[1] + '/' + dates[0]).getTime();
  };
}
