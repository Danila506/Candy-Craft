import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

import cookieParser from 'cookie-parser';

const DEFAULT_CORS_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'https://candy-craft.ru',
  'https://www.candy-craft.ru',
  'https://candy-craft.vercel.app',
  'https://candy-craft.onrender.com',
];

function parseOrigins(value?: string) {
  return (value || '')
    .split(',')
    .map((origin) => origin.trim().replace(/\/+$/, ''))
    .filter(Boolean);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', process.env.TRUST_PROXY || 'loopback');
  app.use(cookieParser());
  const corsOrigins = Array.from(
    new Set([
      ...DEFAULT_CORS_ORIGINS,
      ...parseOrigins(process.env.FRONTEND_URL),
      ...parseOrigins(process.env.CORS_ALLOWED_ORIGINS),
    ]),
  );

  // Включение CORS с правильными настройками
  app.enableCors({
    origin: corsOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders:
      'Content-Type, Authorization, Accept, Idempotency-Key, idempotency-key',
  });

  // Глобальная валидация
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Swagger документация
  const config = new DocumentBuilder()
    .setTitle('Online Store API')
    .setDescription('API для интернет-магазина')
    .setVersion('1.0')
    .addTag('products')
    .addTag('categories')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running`);
  console.log(`Swagger documentation: http://localhost:${port}/api`);
}
bootstrap();
