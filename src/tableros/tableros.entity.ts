import { BaseEntity, Entity, PrimaryColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { ColumnI } from "src/columns/columns.entity";
import { UserI } from "src/users/users.entity";
import { tableroType } from "./dto/tableroType.enum";

@Entity()
export class TablerosI extends BaseEntity{
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => UserI, user => user.id)
    owner: UserI;
    
    @ManyToMany(() => UserI)
    @JoinTable()
    friends: UserI[];

    @Column()
    type: tableroType;

    @Column()
    description: string;

    @OneToMany(() => ColumnI, column => column.Tablero)
    columns: ColumnI;
}