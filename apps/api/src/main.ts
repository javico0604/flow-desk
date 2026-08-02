import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());


  const config = new DocumentBuilder()
    .setTitle('Flow Desk API')
    .setDescription('Backend Jira clone')
    .setVersion('1.0')
    .addBearerAuth()
    .build();


  const document = SwaggerModule.createDocument(
    app,
    config
  );


  SwaggerModule.setup(
    'api',
    app,
    document
  );


  await app.listen(3000);
}

bootstrap();