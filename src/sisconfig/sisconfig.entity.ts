import { BaseEntity, Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class SisConfigI extends BaseEntity{
    @PrimaryColumn()
    id: string;
    
    @Column()
    idUser: string;

    @Column()
    tableroType: string;

    @Column()
    profilePhotos: string;

    @Column()
    applications: string[];

    @Column()
    hobbies: string[];
}