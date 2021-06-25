import { Entity, BaseEntity, ObjectIdColumn, Column } from "typeorm";
import { Province } from "src/data/province.enum";

@Entity()
export class Professor extends BaseEntity{

    @ObjectIdColumn()
    id: string;
    
    @Column()
    name: string;
    
    @Column()
    email: string;
    
    @Column()
    dni: string;
    
    @Column()
    provinceOfResidence: Province;
    
    @Column()
    career: string;
    
    @Column()
    avatarUrl: string;
    
    @Column()
    shareBoards: string[];

    @Column()
    userId: string;

}