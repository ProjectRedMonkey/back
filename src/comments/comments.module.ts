import { Logger, Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { CommentsDao } from './dao/comments.dao';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    HttpModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService, Logger, CommentsDao],
})
export class CommentsModule {}
