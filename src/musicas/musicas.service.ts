import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMusicaDto } from './dto/create-musica.dto';
import { UpdateMusicaDto } from './dto/update-musica.dto';
import { Musica } from './entities/musica.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MusicasService {
  constructor(
    @InjectRepository(Musica) // ✅ INJEÇÃO DO REPOSITÓRIO
    private readonly musicaRepository: Repository<Musica>,
  ) { }


  async create(musica: Partial<Musica>): Promise<Musica> {
    try {
      // Extrai o ID do arquivo do Google Drive
      const idArquivo = this.extrairIdGoogleDrive(musica.url);
      if (!idArquivo) {
        throw new InternalServerErrorException('URL do Google Drive inválida');
      }

      // Converte para o link direto
      musica.url = `https://drive.google.com/uc?export=download&id=${idArquivo}`;


      const novaMusica = this.musicaRepository.create(musica);
      return await this.musicaRepository.save(novaMusica);
    } catch (error) {
      console.error('Erro ao Cadastrar Usuário:', error.message);
      throw new InternalServerErrorException(`Erro as Cadastrar Música ${error.message}`);
    }

  }

  // Função para extrair o ID do arquivo do Google Drive
  private extrairIdGoogleDrive(url: string): string | null {
    const match = url.match(/\/d\/(.*?)\//);
    return match ? match[1] : null;
  }


  findAll() {
    return this.musicaRepository.find();
  }

  findOne(id: number) {
    return this.musicaRepository.findOne({ where: { id } });
  }

  update(id: number, updateMusicaDto: UpdateMusicaDto) {
    return `This action updates a #${id} musica`;
  }

  remove(id: number) {
    return `This action removes a #${id} musica`;
  }
}
