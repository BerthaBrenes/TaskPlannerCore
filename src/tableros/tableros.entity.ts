import { BaseEntity, Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class TablerosI extends BaseEntity{
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    owner: string;
    
    @Column()
    type: string;

    @Column()
    description: string;

    @Column()
    columns: string;
}