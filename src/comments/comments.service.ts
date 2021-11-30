import {
  Body,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  Param,
  UnprocessableEntityException,
} from '@nestjs/common';
import { COMMENTS } from '../data/comment';
import {
  catchError,
  concatMap,
  defaultIfEmpty,
  find,
  findIndex,
  from,
  map,
  mergeMap,
  Observable,
  of,
  Subscription,
  tap,
  throwError,
} from 'rxjs';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { filter } from 'rxjs/operators';
import { Comment } from '../comments/schemas/comment.schema';
import { CommentsDao } from './dao/comments.dao';
import { HandlerParams } from '../validators/handler-params';

@Injectable()
export class CommentsService {
  constructor(private readonly _commentsDao: CommentsDao) {
    const l = 0;
  }

  findAll = (): Observable<CommentEntity[] | void> =>
    this._commentsDao.find().pipe(
      filter((_: Comment[]) => !!_),
      map((_: Comment[]) => _.map((__: Comment) => new CommentEntity(__))),
      defaultIfEmpty(undefined),
    );

  findOneById = (id: string): Observable<CommentEntity> =>
    this._commentsDao.findOneById(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((b: Comment) =>
        !!b
          ? of(new CommentEntity(b))
          : throwError(
              () => new NotFoundException(`No Comment with id'${id}'.`),
            ),
      ),
    );
  deleteAllFromBook = (idBook: string): Observable<void> =>
    this.findAll().pipe(
      map((cs: CommentEntity[]) =>
        cs.map((c: CommentEntity) =>
          c.idOfBook == idBook
            ? this.delete(c.id).subscribe(() => undefined) &&
              Logger.log(
                c.idOfBook + ' deleteddddddddd : ' + idBook + '  ' + c.id,
              )
            : Logger.log(
                c.idOfBook + ' nooooooooooooooo : ' + idBook + '  ' + c.id,
              ),
        ),
      ),
      map(() => undefined),
    );

  delete = (id: string): Observable<void> =>
    this._commentsDao.findByIdAndRemove(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((b: Comment) =>
        !!b
          ? of(undefined)
          : throwError(
              () => new NotFoundException(`No Comment with id'${id}'.`),
            ),
      ),
    );

  create = (comment: CreateCommentDto): Observable<CommentEntity> =>
    this._addComment(comment).pipe(
      mergeMap((b: CreateCommentDto) => this._commentsDao.save(b)),
      catchError((e) =>
        e.code === 11000
          ? throwError(
              () => new ConflictException(`conflic whith another comments`),
            )
          : throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((b: Comment) => new CommentEntity(b)),
    );
  /*
  updateIndex = (idBook: string, texts: string[]): Observable<void> =>
    this.findAll().pipe(
      filter((cs: CommentEntity[]) => !!cs),
      map((cs: CommentEntity[]) =>
        cs.map((c: CommentEntity) =>
          c.idOfBook == idBook
            ? this._upp(
                c,
                c.start,
                c.end,
                texts[0]
                  .toLowerCase()
                  .indexOf(texts[1].toLowerCase().slice(c.start, c.end)),
              )
            : Logger.log("no update " + c.idOfBook + " " + idBook),
        ),
      ),
      defaultIfEmpty(undefined),
    );

 */

  updateIndex = (idBook: string, texts: string[]): Observable<void> =>
    this.findAll().pipe(
      tap((cs: CommentEntity[]) =>
        Logger.log(texts[0] + ' ' + texts[1] + ' ' + cs.length),
      ),
      filter((cs: CommentEntity[]) => !!cs),
      map((cs: CommentEntity[]) => {
        cs.map((c: CommentEntity) =>
          this._upp(
            c,
            texts,
            idBook,
          ),
        );
      }),
      defaultIfEmpty(undefined),
    );
  async _upp(
    comment: CommentEntity,
    texts: string[],
    idBook: string,
  ) {
    if (comment.idOfBook == idBook) {
      var a = texts[1].slice(comment.start, comment.end);
      Logger.log("sclice " + a);
      Logger.log("azeae " + texts[0]);
      var newStart = texts[0].indexOf(a);
      Logger.log("aaa" + idBook + " " + comment.idOfBook + " " + newStart)
      if (newStart == -1) {
        Logger.log("azzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
        this.delete(comment.id).subscribe();
      } else {
        comment.end += newStart - comment.start;
        comment.start = newStart;
        Logger.log('new : ' + comment.end + ' ' + comment.start);
        this.update(comment.id, new CommentEntity(comment)).subscribe(
          () => undefined,
        );
      }
    }
  }

  update = (id: string, comment: UpdateCommentDto): Observable<CommentEntity> =>
    this._commentsDao.findOneByIdAndUpdate(id, comment).pipe(
      catchError((e) =>
        e.code === 11000
          ? throwError(
              () => new ConflictException(`conflic whith another comment`),
            )
          : throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((b: Comment) =>
        !!b
          ? of(new CommentEntity(b))
          : throwError(
              () => new NotFoundException(`No Comment with id'${id}'.`),
            ),
      ),
    );

  private _addComment = (
    comment: CreateCommentDto,
  ): Observable<CreateCommentDto> =>
    of({
      ...comment,
      upVote: 0,
    });
  /*
  private _createId = (): string => `${new Date().getTime()}`;
  private _findCommentIndex = (id: string): Observable<number> =>
    from(this._comments).pipe(
      findIndex((c: Comment) => c.id === id),
      mergeMap((i: number) =>
        i >= 0
          ? of(i)
          : throwError(
              () => new NotFoundException(`no comment with id '${id}'.`),
            ),
      ),
    );

  private _parseDate = (date: string): number => {
    const dates = date.split('/');
    return new Date(dates[2] + '/' + dates[1] + '/' + dates[0]).getTime();
  };
  
 */
}
