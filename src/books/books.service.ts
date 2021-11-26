import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './books.types';
import { BOOKS } from '../data/book';
import {
  find,
  findIndex,
  from,
  map,
  mergeMap,
  Observable,
  of, tap,
  throwError
} from "rxjs";

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

  delete = (id: string): Observable<void> =>
    this._findBookIndex(id).pipe(
      tap((i: number) => this._book.slice(i, 1)),
      map(() => undefined),
    );

  private _findBookIndex = (id: string): Observable<number> =>
    from(this._book).pipe(
      findIndex((b: Book) => b.id === id),
      mergeMap((i: number) =>
        i >= 0
          ? of(i)
          : throwError(() => new NotFoundException(`no book with id '${id}'.`)),
      ),
    );

  private _parseDate = (date: string): number => {
    const dates = date.split('/');
    return new Date(dates[2] + '/' + dates[1] + '/' + dates[0]).getTime();
  };
}
