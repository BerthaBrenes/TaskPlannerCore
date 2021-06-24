import { BaseEntity, Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { ColumnI } from "src/columns/columns.entity";
import { priorityType } from "./dto/priorityType.enum";

@Entity()
export class TareasI extends BaseEntity{
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    priority: priorityType;
    
    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @Column()
    owner: string;

    @Column()
    dependency: string[];

    @ManyToOne(() => ColumnI, column => column.Tareas)
    column: ColumnI;
}