import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  catchError,
  defaultIfEmpty,
  map,
  mergeMap,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './entities/book.entity';
import { BooksDao } from './dao/books.dao';
import { Book } from './schemas/book.schema';
import { filter } from 'rxjs/operators';

@Injectable()
export class BooksService {
  constructor(private readonly _booksDao: BooksDao) {}

  findOne = (id: string): Observable<BookEntity> =>
    this._booksDao.findOneById(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((b: Book) =>
        !!b
          ? of(new BookEntity(b))
          : throwError(() => new NotFoundException(`No Book with id'${id}'.`)),
      ),
    );

  findAll = (): Observable<BookEntity[] | void> =>
    this._booksDao.find().pipe(
      filter((_: Book[]) => !!_),
      map((_: Book[]) => _.map((__: Book) => new BookEntity(__))),
      defaultIfEmpty(undefined),
    );

  delete = (id: string): Observable<void> =>
    this._booksDao.findByIdAndRemove(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((b: Book) =>
        !!b
          ? of(undefined)
          : throwError(() => new NotFoundException(`No Book with id'${id}'.`)),
      ),
    );

  create = (book: CreateBookDto): Observable<BookEntity> =>
    this._addBook(book).pipe(
      mergeMap((b: CreateBookDto) => this._booksDao.save(b)),
      catchError((e) =>
        e.code === 11000
          ? throwError(
              () => new ConflictException(`conflic whith another book`),
            )
          : throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((b: Book) => new BookEntity(b)),
    );

  update = (id: string, book: UpdateBookDto): Observable<BookEntity> =>
    this._booksDao.findOneByIdAndUpdate(id, book).pipe(
      catchError((e) =>
        e.code === 11000
          ? throwError(
              () => new ConflictException(`conflic whith another book`),
            )
          : throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((b: Book) =>
        !!b
          ? of(new BookEntity(b))
          : throwError(() => new NotFoundException(`No Book with id'${id}'.`)),
      ),
    );

  private _addBook = (book: CreateBookDto): Observable<CreateBookDto> =>
    of({
      ...book,
      photo:
        'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg',
    });

  // private _createId = (): string => `${new Date().getTime()}`;
  /*
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
  
   */
}
