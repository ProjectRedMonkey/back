import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BookDocument = Book & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (doc: any, ret: any) => {
      // delete obsolete data
      delete ret._id;
    },
  },
  versionKey: false,
})
export class Book {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: any;

  @Prop({
    type: String,
    trim: true,
  })
  photo: string;

  @Prop({
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  })
  author: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  extract: string;

  @Prop({
    type: Date,
    required: true,
  })
  date: Date;

  @Prop({
    type: Number,
    required: true,
  })
  page: number;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  category: string;

  /*
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  commentsId: string;
  */
}

export const BookSchema = SchemaFactory.createForClass(Book);
