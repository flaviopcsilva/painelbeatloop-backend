import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePackDto } from './dto/create-pack.dto';
import { UpdatePackDto } from './dto/update-pack.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pack } from './entities/pack.entity';
import { Musica } from 'src/musicas/entities/musica.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PacksService {
  delete(id: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Pack)
    private packRepository: Repository<Pack>,
    @InjectRepository(Musica)
    private musicaRepository: Repository<Musica>,
  ) { }

  async create(nome: string, musicaIds: number[]) {
    try {
      const musicas = await this.musicaRepository.findByIds(musicaIds);
      const pack = this.packRepository.create({ nome, musicas });
      return this.packRepository.save(pack);
    } catch (error) {
      console.error('Erro ao Cadastrar Usuário:', error.message);
      throw new InternalServerErrorException(`Erro as Cadastrar Packs ${error.message}`);
    }

  }

  async listarMusicasPorPack(packId: number): Promise<Pack | null> {
    return this.packRepository.findOne({
      where: { id: packId },
      relations: ['musicas'], // 🚀 Traz as músicas associadas ao pack
    });
  }

  // async listarTodosOsPacks(): Promise<Pack[]> {
  //   return await this.packRepository.find({
  //     relations: ['musicas'], // 🚀 Inclui as músicas do pack
  //   });
  // }

  findAll() {
    return this.packRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} pack`;
  }

  update(id: number, updatePackDto: UpdatePackDto) {
    return `This action updates a #${id} pack`;
  }

  async remove(id: number): Promise<{ message: string }> {
    const packs = await this.packRepository.findOne({ where: { id } });
    try {
      if (!packs) {
        return { message: `Pack com ID ${id} não encontrado.` };
      }

      await this.packRepository.remove(packs);
      return { message: `Pack com ID ${id} deletado com sucesso.` };
    } catch (error) {
      throw new NotFoundException(`Erro na rota de deletar admins. ${error.message}`);
    }

  }
}
