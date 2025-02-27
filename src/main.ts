import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.setGlobalPrefix('api'); // Prefixo para todas as rotas

  console.log(configService.get<string>('FRONT_END'));
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configurar o ValidationPipe globalmente
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Permite a transformação dos dados de entrada
      whitelist: true, // Remove propriedades não definidas no DTO
      forbidNonWhitelisted: true, // Lança erro se propriedades não definidas forem enviadas
    }),
  );

  await app.listen(3000);
}
bootstrap();
