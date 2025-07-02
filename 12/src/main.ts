import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Налаштування CORS
  app.enableCors({
    origin: true, // Дозволяємо запити з будь-якого джерела
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Налаштування статичних файлів
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/', // Шлях, за яким будуть доступні файли
  });

  // Налаштування глобального префіксу для API
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(`Static files (images) available at: http://localhost:${port}/public/images/`);
}
bootstrap();
