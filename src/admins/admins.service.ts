import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {

  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService
  ) { }


  // metodo para verificar se o email existe
  async checkIfEmailExists(email: string): Promise<boolean> {
    const admin = await this.adminRepository.findOne({ where: { email } });
    return !!admin; // Retorna true se o email existir
  }


  async create(adminData: Admin): Promise<{ message: string, admin?: Admin }> {

    try {
      const admin = this.adminRepository.create(adminData);

      const emailExists = await this.checkIfEmailExists(admin.email);


      if (emailExists) {
        return {
          message: 'Email já existe.'
        }
      }


      const savedAdmin = await this.adminRepository.save(admin);
      return {
        message: `Admin criado com sucesso `,
        admin: savedAdmin
      }
    } catch (error) {
      throw new NotFoundException(`Erro na rota de Cadastrar admins. ${error.message}`);
    }

  }



  async login(email: string, senha: string) {
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (admin) {
      const senhaValida = await bcrypt.compare(senha, admin.senha);
      if (!senhaValida) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      const token = this.jwtService.sign({ id: admin.id, email: admin.email });

      return { token };

    }

    // 2. Se não encontrou no banco, verifica se é o superusuário do .env
    const superEmail = process.env.SUPER_ADMIN_EMAIL;
    const superPassword = process.env.SUPER_ADMIN_PASSWORD;

    if (email === superEmail && senha === superPassword) {
      const superAdminPayload = { id: 0, email: superEmail, role: 'superadmin' };

      return {
        token: this.jwtService.sign(superAdminPayload),
        user: superAdminPayload
      };
    }

    throw new UnauthorizedException('Credenciais inválidas.');

  }


  findAll() {
    return this.adminRepository.find();
  }

  async findOne(id: number) {
    const admin = await this.adminRepository.findOne({ where: { id } })


    if (!admin) {
      throw new NotFoundException(`Admin com ID ${id} não encontrado.`);
    }
    return admin
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  async delete(id: number): Promise<{ message: string }> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    try {
      if (!admin) {
        return { message: `Admin com ID ${id} não encontrado.` };
      }

      await this.adminRepository.remove(admin);
      return { message: `Admin com ID ${id} deletado com sucesso.` };
    } catch (error) {
      throw new NotFoundException(`Erro na rota de deletar admins. ${error.message}`);
    }

  }
}
