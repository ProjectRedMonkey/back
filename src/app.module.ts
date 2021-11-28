import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { CommentsModule } from './comments/comments.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as Config from 'config';
@Module({
  imports: [
    BooksModule,
    CommentsModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
  ],
})
export class AppModule {}
