import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:4200', 'https://painelbeatloop-backend.onrender.com'], // Permite o frontend local e produção
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove campos não esperados do body
    forbidNonWhitelisted: true, // Retorna erro se enviar um campo inválido
    transform: true, // Transforma o body automaticamente no DTO esperado
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
