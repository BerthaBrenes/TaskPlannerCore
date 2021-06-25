import { BaseEntity, Entity, Column, ObjectIdColumn } from "typeorm";
import { userType } from "./dto/userType.enum";
import { hobbies } from "./dto/hobbies.enum";
import { applications } from "./dto/applications.enum";

@Entity()
export class UserI extends BaseEntity{

    @ObjectIdColumn()
    id:string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    dni: string

    @Column()
    license?: string

    @Column()
    career: string

    @Column()
    province_residence: string

    @Column()
    province_living: string;

    @Column()
    profile_photo?: string;

    @Column()
    type: userType;

    @Column()
    application?: applications[];

    @Column()
    hobbies?: hobbies[];

    @Column()
    my_boards?: string[];

    @Column()
    shared_boards?: string[];

    @Column()
    friends?: string[];
    

}