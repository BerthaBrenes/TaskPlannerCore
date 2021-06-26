import { Repository, EntityRepository } from "typeorm";
import { ColumnI } from "./columns.entity";
import { ColumnsDTO } from "./dto/columns.dto";

@EntityRepository(ColumnI)
export class ColumnsRepository extends Repository<ColumnI>{
    /**
     * Create a new column
     * @param data of the column
     */
    async createColumn(data: ColumnsDTO){
        const {Tablero, Tareas, name} = data;
        const column = new ColumnI();
        column.Tablero = Tablero;
        column.Tareas = Tareas;
        column.name = name;
        return await column.save();
    }
}