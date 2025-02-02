import { Module } from '@nestjs/common';
import { MusicasService } from './musicas.service';
import { MusicasController } from './musicas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pack } from 'src/packs/entities/pack.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Musica } from './entities/musica.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Musica]),
  ],
  controllers: [MusicasController],
  providers: [MusicasService],
})
export class MusicasModule { }
