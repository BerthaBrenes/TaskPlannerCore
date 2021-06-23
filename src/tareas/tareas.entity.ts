import { BaseEntity, Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { ColumnI } from "src/columns/columns.entity";

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

    @ManyToOne(() => ColumnI, column => column.Tareas)
    column: string;
}