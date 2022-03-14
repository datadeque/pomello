import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(process.env.JWT_SECRET));
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://datadeque.com'
        : ['http://localhost:3000', 'https://studio.apollographql.com'],
    credentials: true,
  });
  await app.listen(3001);
}
bootstrap();
