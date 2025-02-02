import { Module } from '@nestjs/common';
import { PacksService } from './packs.service';
import { PacksController } from './packs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pack } from './entities/pack.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { MusicasModule } from 'src/musicas/musicas.module';
import { Musica } from 'src/musicas/entities/musica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pack, Musica]), MusicasModule],
  controllers: [PacksController],
  providers: [PacksService],
})
export class PacksModule { }
