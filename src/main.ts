import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api'); // Prefixo para todas as rotas
  app.enableCors({
    origin: configService.get<string>('FRONT_URL'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  // const dataSource = app.get(DataSource);
  // await dataSource.initialize();
  // await dataSource.runMigrations();

  await app.listen(3000);
}
bootstrap();
