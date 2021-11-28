import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Book, BookDocument } from '../schemas/book.schema';
import { UpdateBookDto } from '../dto/update-book.dto';

@Injectable()
export class BooksDao {
  constructor(
    @InjectModel(Book.name)
    private readonly _booksModel: Model<BookDocument>,
  ) {}

  find = (): Observable<Book[] | void> =>
    from(this._booksModel.find({})).pipe(
      filter((docs: BookDocument[]) => !!docs && docs.length > 0),
      map((docs: BookDocument[]) => docs.map((_: BookDocument) => _.toJSON())),
      defaultIfEmpty(undefined),
    );

  findOneById = (id: string): Observable<Book> =>
    from(this._booksModel.findById(id)).pipe(
      filter((document: BookDocument) => !!document),
      map((document: BookDocument) => document.toJSON()),
      defaultIfEmpty(undefined),
    );
  findOneByIdAndUpdate = (
    id: string,
    book: UpdateBookDto,
  ): Observable<Book | void> =>
    from(
      this._booksModel.findByIdAndUpdate(id, book, {
        new: true,
        runValidators: true,
      }),
    ).pipe(
      filter((document: BookDocument) => !!document),
      map((document: BookDocument) => document.toJSON()),
      defaultIfEmpty(undefined),
    );
  findByIdAndRemove = (id: string): Observable<Book | void> =>
    from(this._booksModel.findByIdAndRemove(id)).pipe(
      filter((document: BookDocument) => !!document),
      map((document: BookDocument) => document.toJSON()),
      defaultIfEmpty(undefined),
    );

  save = (book: UpdateBookDto): Observable<Book> =>
    from(new this._booksModel(book).save()).pipe(
      map((document: BookDocument) => document.toJSON()),
    );
}
