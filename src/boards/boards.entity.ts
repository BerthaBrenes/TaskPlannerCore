import { BaseEntity, Entity, Column, ObjectIdColumn } from "typeorm";

@Entity()
export class Board extends BaseEntity{
    @ObjectIdColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    owner: string;
    
    //friends: User[];

    @Column()
    type: string;

    @Column()
    description: string;

    @Column()
    columns: string[];

    @Column()
    creationDate: string;
}