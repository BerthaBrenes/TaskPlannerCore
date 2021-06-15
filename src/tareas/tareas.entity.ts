import { BaseEntity, Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class TareasI extends BaseEntity{
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    priority: string;
    
    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @Column()
    owner: string;

    @Column()
    dependency: string;

    @Column()
    column: string;
}