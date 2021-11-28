import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as Config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BooksModule } from './books/books.module';
import { AppConfig, SwaggerConfig } from './app.types';
import { CommentsModule } from './comments/comments.module';
async function bootstrap(config: AppConfig, swaggerConfig: SwaggerConfig) {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  await app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const option = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .build();

  const document = SwaggerModule.createDocument(app, option, {
    include: [BooksModule, CommentsModule],
  });
  SwaggerModule.setup(swaggerConfig.path, app, document);

  app.enableCors();
  await app.listen(config.port, config.host);
  Logger.log(
    `Application served at http://${config.host}:${config.port}`,
    'bootstrap',
  );
}
bootstrap(
  Config.get<AppConfig>('server'),
  Config.get<SwaggerConfig>('swagger'),
);
