import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [BooksModule, CommentsModule],
})
export class AppModule {}
