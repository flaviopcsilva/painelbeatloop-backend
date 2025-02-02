import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicasModule } from './musicas/musicas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AdminsModule } from './admins/admins.module';
import { PacksModule } from './packs/packs.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import * as fs from 'fs';
import * as cors from 'cors';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true
      ,
      ssl: {
        ca: fs.readFileSync('src/ca.pem').toString(),
      },
    }),
    MusicasModule, UsuariosModule, AdminsModule, PacksModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cors({
          origin: ['http://localhost:4200', 'https://painelbeatloop-backend.onrender.com'], // Substitua pelo domínio do frontend
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          credentials: true, // Se precisar enviar cookies ou autenticação
        }),
      )
      .forRoutes('*');
  }
}
