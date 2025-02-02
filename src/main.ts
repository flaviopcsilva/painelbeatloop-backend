import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permitir qualquer domínio
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove campos não esperados do body
    forbidNonWhitelisted: true, // Retorna erro se enviar um campo inválido
    transform: true, // Transforma o body automaticamente no DTO esperado
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
