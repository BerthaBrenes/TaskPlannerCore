import { BaseEntity, Entity, PrimaryColumn, Column } from "typeorm";
import { tableroType } from "src/tableros/dto/tableroType.enum";
import { applications } from "src/users/dto/applications.enum";
import { hobbies } from "src/users/dto/hobbies.enum";

@Entity()
export class SisConfigI extends BaseEntity{
    @PrimaryColumn()
    id: string;
    
    @Column()
    idUser: string;

    @Column()
    tableroType: tableroType;

    @Column()
    profilePhotos: string;

    @Column()
    applications: applications[];

    @Column()
    hobbies: hobbies[];
}