import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Book } from './books.types';
import { BOOKS } from '../data/book';
import {
  find,
  findIndex,
  from,
  map,
  mergeMap,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private _books: Book[];

  constructor() {
    this._books = [].concat(BOOKS).map((book) => ({
      ...book,
      date: this._parseDate(book.date),
    }));
  }

  findOne = (id: string): Observable<Book> =>
    from(this._books).pipe(
      find((b: Book) => b.id === id),
      mergeMap((b: Book) =>
        !!b
          ? of(b)
          : throwError(() => new NotFoundException(`No Book with id'${id}'.`)),
      ),
    );

  findAll = (): Observable<Book[] | void> =>
    of(this._books).pipe(
      map((books: Book[]) => (!!books && !!books.length ? books : undefined)),
    );

  delete = (id: string): Observable<void> =>
    this._findBookIndex(id).pipe(
      tap((index: number) => this._books.splice(index, 1)),
      map(() => undefined),
    );

  create = (book: CreateBookDto): Observable<Book> =>
    from(this._books).pipe(
      find(
        (b: Book) =>
          b.title.toLowerCase() === book.title.toLowerCase() &&
          b.author.toLowerCase() === book.author.toLowerCase(),
      ),
      mergeMap((b: Book) =>
        !!b
          ? throwError(
              () =>
                new ConflictException(
                  `already a book with title '${b.title}' and the author '${b.author}'.`,
                ),
            )
          : this._addBook(book),
      ),
    );

  update = (id: string, book: UpdateBookDto): Observable<Book> =>
    from(this._books).pipe(
      find((b: Book) => b.id === id),
      mergeMap((b: Book) =>
        !!b
          ? this._findBookIndex(id)
          : throwError(() => new ConflictException(`No Book with id'${id}'.`)),
      ),
      tap((index: number) => Object.assign(this._books[index], book)),
      map((index: number) => this._books[index]),
    );

  private _addBook = (book: CreateBookDto): Observable<Book> =>
    of({
      ...book,
      id: this._createId(),
      date: this._parseDate('11/01/1999'),
    }).pipe(tap((b: Book) => (this._books = this._books.concat(b))));

  private _createId = (): string => `${new Date().getTime()}`;
  private _findBookIndex = (id: string): Observable<number> =>
    from(this._books).pipe(
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
