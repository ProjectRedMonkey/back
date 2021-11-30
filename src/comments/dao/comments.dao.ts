import { Injectable, Logger } from "@nestjs/common";
import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map, tap } from "rxjs/operators";
import { Comment, CommentDocument } from '../schemas/comment.schema';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Injectable()
export class CommentsDao {
  constructor(
    @InjectModel(Comment.name)
    private readonly _commentsModel: Model<CommentDocument>,
  ) {}

  find = (): Observable<Comment[] | void> =>
    from(this._commentsModel.find({})).pipe(
      filter((docs: CommentDocument[]) => !!docs && docs.length > 0),
      map((docs: CommentDocument[]) =>
        docs.map((_: CommentDocument) => _.toJSON()),
      ),
      defaultIfEmpty(undefined),
    );

  findOneById = (id: string): Observable<Comment> =>
    from(this._commentsModel.findById(id)).pipe(
      filter((document: CommentDocument) => !!document),
      map((document: CommentDocument) => document.toJSON()),
      defaultIfEmpty(undefined),
    );
  findOneByIdAndUpdate = (
    id: string,
    comment: UpdateCommentDto,
  ): Observable<Comment | void> =>
    from(
      this._commentsModel.findByIdAndUpdate(id, comment, {
        new: true,
        runValidators: true,
      }),
    ).pipe(
      filter((document: CommentDocument) => !!document),
      map((document: CommentDocument) => document.toJSON()),
      defaultIfEmpty(undefined),
    );
  findByIdAndRemove = (id: string): Observable<Comment | void> =>
    from(this._commentsModel.findByIdAndRemove(id)).pipe(
      filter((document: CommentDocument) => !!document),
      map((document: CommentDocument) => document.toJSON()),
      defaultIfEmpty(undefined),
    );


  save = (comment: UpdateCommentDto): Observable<Comment> =>
    // @ts-ignore
    from(new this._commentsModel(comment).save()).pipe(
      map((document: CommentDocument) => document.toJSON()),
    );
}
