import { IsNotEmpty } from "class-validator";
import { Musica } from "src/musicas/entities/musica.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('packs')
export class Pack {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty({ message: `O campo nome é obrigatório.` })
    nome: string;

    @ManyToMany(() => Musica, musica => musica.packs, { eager: true })  // 👈 EAGER CARREGA AUTOMATICAMENTE AS MÚSICAS
    @JoinTable()
    @IsNotEmpty({ message: `O campo músicas é obrigatório.` })
    musicas: Musica[];
}
