import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new  ValidationPipe({whitelist: true}))

  const cors = {
    origin: ["http://localhost:3000"],
    methods: 'GET, HEAD, PUT, DELETE'
  }

  app.enableCors(cors)
  await app.listen(3000);
}
bootstrap();
