import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { PacksService } from './packs.service';
import { CreatePackDto } from './dto/create-pack.dto';
import { UpdatePackDto } from './dto/update-pack.dto';

@Controller('packs')
export class PacksController {
  constructor(private readonly packsService: PacksService) { }

  @Post()
  create(@Body() data: { nome: string; musicaIds: number[] }) {
    return this.packsService.create(data.nome, data.musicaIds);
  }

  @Get()
  findAll() {
    return this.packsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackDto: UpdatePackDto) {
    return this.packsService.update(+id, updatePackDto);
  }

  @Get(':id/musicas')
  async listarMusicas(@Param('id') id: string) {
    const pack = await this.packsService.listarMusicasPorPack(Number(id));

    if (!pack) {
      return { message: 'Pack não encontrado' };
    }
    return { pack: pack.nome, musicas: pack.musicas };
  }


  // @Get('allpacks')
  // async listarPacks() {
  //   const packs = await this.packsService.listarTodosOsPacks();
  //   console.log(packs);

  //   return packs.map(pack => ({
  //     id: pack.id,
  //     nome: pack.nome,
  //     musicas: pack.musicas ? pack.musicas.map(musica => ({
  //       id: musica.id,
  //       titulo: musica.titulo,
  //       artista: musica.artista,
  //       url: musica.url,
  //     })) : [],
  //   }));
  // }

  @Delete(':id')
  async remove(@Param('id', new ParseIntPipe({ exceptionFactory: (error) => new BadRequestException('O ID precisa ser um número válido.') })) id: number) {
    return this.packsService.remove(id);
  }
}
