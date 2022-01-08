/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;

  // Setup global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Setup versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Setup OpenAPI
  const openApiConfig = new DocumentBuilder();
  openApiConfig.setTitle('Einkauf API');
  openApiConfig.setDescription('Einkauf API');
  openApiConfig.setVersion('1.0');
  openApiConfig.addBearerAuth();
  const document = SwaggerModule.createDocument(app, openApiConfig.build());
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
    'NestApplication'
  );
}

bootstrap();
