import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule); 
  app.enableCors();
  app.enableShutdownHooks();
  /**
   * Configuration for the document
   */
  const options = new DocumentBuilder()
    .setTitle('Interview API')
    .setDescription(
      'Este API se utilizará para albergar información de todas las entrevistas del censo',
    )
    .setVersion('1.0')
    .build();
  /**
   * Set the document to the swagger FrontEnd
   */
  const document = SwaggerModule.createDocument(app, options);
  /**
   * Enlace the swagger document and the nest app
   */
  SwaggerModule.setup('api-docs', app, document);
  app.enableShutdownHooks();
  await app.listen(3000);
}
bootstrap();
