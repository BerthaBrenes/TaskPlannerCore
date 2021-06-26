import { BaseEntity, Entity, Column, ObjectIdColumn } from "typeorm";

@Entity()
export class User extends BaseEntity{

    @ObjectIdColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    role: UserType;
}

export enum UserType{
    PROFESSOR = "PROFESSOR",
    STUDENT = "STUDENT",
    ADMIN = "ADMIN"
}

export enum Province {
    SJ = "San Jose",
    AL = "Alajuela",
    CA = "Cartago",
    HE = "Heredia",
    GU = "Guanacaste",
    PU = "Puntarenas",
    LI = "Limon"
}