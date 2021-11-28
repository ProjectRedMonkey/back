import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { defaultIfEmpty, from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Comment, CommentDocument } from '../schemas/comment.schema';

@Injectable()
export class CommentsDao {
  constructor(
    @InjectModel(Comment.name)
    private readonly _booksModel: Model<CommentDocument>,
  ) {}

  find = (): Observable<Comment[] | void> =>
    from(this._booksModel.find({})).pipe(
      filter((docs: CommentDocument[]) => !!docs && docs.length > 0),
      map((docs: CommentDocument[]) =>
        docs.map((_: CommentDocument) => _.toJSON()),
      ),
      defaultIfEmpty(undefined),
    );
}
