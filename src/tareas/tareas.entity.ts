import { BaseEntity, Entity, Column, ObjectIdColumn} from "typeorm";
import { ColumnI } from "../columns/columns.entity";
import { PriorityType } from "./dto/priorityType.enum";

@Entity()
export class TareasI extends BaseEntity{
    @ObjectIdColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    priority: PriorityType;
    
    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @Column()
    owner: string;

    @Column()
    dependency: string[];

    column: ColumnI;
}