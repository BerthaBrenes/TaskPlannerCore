import { Repository, EntityRepository } from "typeorm";
import { TablerosI } from "./tableros.entity";
import { TableroDTO } from "./dto/tableros.dto";

@EntityRepository(TablerosI)
export class TableroRepository extends Repository<TablerosI>{
    /**
     * Create a tablero
     * @param data of the tablero
     */
    async createTablero(data: TableroDTO){
        const { columns, description, friends, name, owner, type} = data;
        const tablero = new TablerosI();
        tablero.columns = columns;
        tablero.description = description;
        tablero.friends = friends;
        tablero.name = name;
        tablero.owner = owner;
        tablero.type = type;
        return await tablero.save();
    }
}