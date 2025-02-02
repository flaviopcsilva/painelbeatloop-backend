import { IsNotEmpty } from "class-validator";
import { Pack } from "src/packs/entities/pack.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity('musicas')
export class Musica {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty({ message: `O campo Título é obrigatório.` })
    titulo: string;

    @Column()
    @IsNotEmpty({ message: `O campo Artista é obrigatório.` })
    artista: string;

    @Column()
    @IsNotEmpty({ message: `O campo Álbum é obrigatório.` })
    album: string;

    @Column()
    @IsNotEmpty({ message: `O campo Url é obrigatório.` })
    url: string;

    @Column({ nullable: true })
    imagem: string;

    @ManyToMany(() => Pack, (pack) => pack.musicas)
    packs: Pack[];
}
