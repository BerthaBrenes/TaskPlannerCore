import { BaseEntity, Entity, PrimaryColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { ColumnI } from "../columns/columns.entity";
import { User } from "../users/users.entity";
import { tableroType } from "./dto/tableroType.enum";

@Entity()
export class Board extends BaseEntity{
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    owner: User;
    
    friends: User[];

    @Column()
    type: tableroType;

    @Column()
    description: string;

    columns: ColumnI[];

    @Column()
    creationDate: Date;
}