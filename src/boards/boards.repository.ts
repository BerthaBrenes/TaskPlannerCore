import { Repository, EntityRepository, MongoRepository } from "typeorm";
import { Board } from "./boards.entity";
import { BoardDTO } from "./dto/boards.dto";

@EntityRepository(Board)
export class BoardsRepository extends MongoRepository<Board>{
    /**
     * Create a tablero
     * @param data of the tablero
     */
    async createBoard(data: BoardDTO){
        const { columns, description, friends, name, owner, type} = data;
        const tablero = new Board();
        tablero.columns = columns;
        tablero.description = description;
        tablero.friends = friends;
        tablero.name = name;
        tablero.owner = owner;
        tablero.type = type;
        tablero.creationDate = new Date();
        return await tablero.save();
    }
}