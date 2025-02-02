import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { MusicasService } from './musicas.service';
import { CreateMusicaDto } from './dto/create-musica.dto';
import { UpdateMusicaDto } from './dto/update-musica.dto';

@Controller('musicas')
export class MusicasController {
  constructor(private readonly musicasService: MusicasService) { }

  @Post()
  create(@Body() data: { titulo: string; artista: string; url: string; imagem: string }) {

    try {
      return this.musicasService.create(data);
    } catch (error) {
      // Se for um erro do banco, trata aqui
      if (error.code === '23502') {  // Código de erro para NOT NULL em PostgreSQL
        throw new HttpException(`O campo ${error.column} é obrigatório`, HttpStatus.BAD_REQUEST);
      }
      // Erro genérico
      throw new HttpException('Erro ao cadastrar Música', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  @Get()
  findAll() {
    return this.musicasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMusicaDto: UpdateMusicaDto) {
    return this.musicasService.update(+id, updateMusicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicasService.remove(+id);
  }
}
