import { BaseEntity, Entity, PrimaryColumn, Column } from "typeorm";
import { userType } from "./dto/userType.enum";
import { hobbies } from "./dto/hobbies.enum";
import { applications } from "./dto/applications.enum";

@Entity()
export class UserI extends BaseEntity{

    @PrimaryColumn()
    id:string;

    @Column()
    Name_1: string;

    @Column()
    Name_2: string;
  
    @Column()
    Lastname_1: string;

    @Column()
    Lastname_2: string;

    @Column()
    email: string;

    @Column()
    password: string

    @Column()
    dmi: string

    @Column()
    license: string

    @Column()
    career: string

    @Column()
    province_residence: string

    @Column()
    canton: string;

    @Column()
    district: string;

    @Column()
    province_living: string;

    @Column()
    profile_photo: string;

    @Column()
    type: userType;

    @Column()
    application: applications[];

    @Column()
    hobbies: hobbies[];

    @Column()
    Tableros_Owner: string[];

    @Column()
    Tableros_Friend: string[];

    @Column()
    Friends: string[];
    

}