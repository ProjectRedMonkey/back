import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { COMMENTS } from '../data/comment';
import { Comment } from './comments.types';
import {
  defaultIfEmpty,
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
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { filter } from 'rxjs/operators';
import { Comment as CommentSchema } from '../comments/schemas/comment.schema';
import { CommentsDao } from './dao/comments.dao';

@Injectable()
export class CommentsService {
  private _comments: Comment[];

  constructor(private readonly _commentsDao: CommentsDao) {
    this._comments = [].concat(COMMENTS).map((comment) => ({
      ...comment,
      date: this._parseDate(comment.date),
    }));
  }

  findAll = (): Observable<CommentEntity[] | void> =>
    this._commentsDao.find().pipe(
      filter((_: CommentSchema[]) => !!_),
      map((_: CommentSchema[]) =>
        _.map((__: CommentSchema) => new CommentEntity(__)),
      ),
      defaultIfEmpty(undefined),
    );

  findOneById = (id: string): Observable<CommentEntity> =>
    from(this._comments).pipe(
      find((c: Comment) => c.id === id),
      mergeMap((c: Comment) =>
        !!c
          ? of(new CommentEntity(c))
          : throwError(
              () => new NotFoundException(`No comment whith the id '${id}'`),
            ),
      ),
    );

  delete = (id: string): Observable<void> =>
    this._findCommentIndex(id).pipe(
      tap((index: number) => this._comments.splice(index, 1)),
      map(() => undefined),
    );

  create = (comment: CreateCommentDto): Observable<CommentEntity> =>
    from(this._comments).pipe(
      find(
        (c: Comment) =>
          c.start === comment.start &&
          c.end &&
          comment.end &&
          c.text.toLowerCase() === comment.text.toLowerCase(),
      ),
      mergeMap((c: Comment) =>
        !!c
          ? throwError(
              () =>
                new ConflictException(
                  `already the same comment '${comment.text}' at the same position`,
                ),
            )
          : this._addComment(comment),
      ),
    );

  update = (id: string, comment: UpdateCommentDto): Observable<CommentEntity> =>
    from(this._comments).pipe(
      find(
        (c: Comment) =>
          c.id === id &&
          c.author.toLowerCase() === comment.author.toLowerCase(),
      ),
      mergeMap((c: Comment) =>
        !!c
          ? this._findCommentIndex(id)
          : throwError(
              () =>
                new NotFoundException(
                  `no comment with id '${id}' of the author '${comment.author}'`,
                ),
            ),
      ),
      tap((index: number) => Object.assign(this._comments[index], comment)),
      map((index: number) => new CommentEntity(this._comments[index])),
    );

  private _createId = (): string => `${new Date().getTime()}`;
  private _addComment = (
    comment: CreateCommentDto,
  ): Observable<CommentEntity> =>
    of({
      ...comment,
      date: this._parseDate('12/12/1212'),
      id: this._createId(),
      upVote: 0,
    }).pipe(
      tap((c: Comment) => (this._comments = this._comments.concat(c))),
      map((c: Comment) => new CommentEntity(c)),
    );
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
}
