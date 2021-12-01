import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BookSchema } from '../../books/schemas/book.schema';

export type CommentDocument = Comment & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (doc: any, ret: any) => {
      delete ret._id;
    },
  },
  versionKey: false,
})
export class Comment {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: any;

  @Prop({
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  })
  author: string;

  @Prop({
    type: Date,
    required: true,
  })
  date: Date;

  @Prop({
    type: Number,
    required: true,
    min: 0,
    trim: true,
  })
  start: number;

  @Prop({
    type: Number,
    required: true,
    min: 1,
    trim: true,
  })
  end: number;

  @Prop({
    type: String,
    required: true,
    minlength: 10,
    trim: true,
  })
  text: string;

  @Prop({
    type: Number,
    required: true,
    trim: true,
  })
  upVote: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Books',
  })
  idOfBook: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
