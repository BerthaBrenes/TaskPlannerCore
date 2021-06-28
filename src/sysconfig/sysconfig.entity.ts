import { BaseEntity, Entity, Column, ObjectIdColumn } from "typeorm";

@Entity()
export class SysConfig extends BaseEntity{
    @ObjectIdColumn()
    id: string;
    
    @Column()
    date: string;

    @Column()
    boardTypes: string[];

    @Column()
    lastModifiedBy: string;

    @Column()
    systemUses: string[];

    @Column()
    hobbies: string[];

    @Column()
    avatars: string[];
}