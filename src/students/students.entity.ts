import { Province } from "../data/province.enum";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Student extends BaseEntity {

    @ObjectIdColumn()
    id: string;

    @Column()
    userId: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    dni: string;

    @Column()
    studentCard: string;

    @Column()
    career: string;

    @Column()
    provinceOfProvenance: Province;

    @Column()
    provinceOfResidence: Province;

    @Column()
    usesSystemBec: string[];

    @Column()
    hobbies: string[];

    @Column()
    avatarUrl: string;

    @Column()
    phone?: string;

    @Column()
    myBoards: string[];

    @Column()
    sharedBoards: string[];

    @Column()
    friends: string[];
}