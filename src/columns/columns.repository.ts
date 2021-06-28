import { EntityRepository, MongoRepository } from "typeorm";
import { ColumnI } from "./columns.entity";
import { ColumnsDTO } from "./dto/columns.dto";

@EntityRepository(ColumnI)
export class ColumnsRepository extends MongoRepository<ColumnI>{
    /**
     * Create a new column
     * @param data of the column
     */
    async createColumn(data: ColumnsDTO){
        const {board, name} = data;
        const column = new ColumnI();
        column.board = board;
        column.tasks = [];
        column.name = name;
        return column.save();
    }
}