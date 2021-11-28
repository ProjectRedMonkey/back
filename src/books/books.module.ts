import { Logger, Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { BooksDao } from './dao/books.dao';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    HttpModule,
  ],
  controllers: [BooksController],
  providers: [BooksService, Logger, BooksDao],
})
export class BooksModule {}
