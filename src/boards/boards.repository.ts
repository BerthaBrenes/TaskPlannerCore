import { EntityRepository, MongoRepository } from "typeorm";
import { Board } from "./boards.entity";
import { BoardDTO } from "./dto/boards.dto";

@EntityRepository(Board)
export class BoardsRepository extends MongoRepository<Board>{

    async createBoard(data: BoardDTO){
        const { columns, description, name, owner, type} = data;
        const board = new Board();
        board.columns = columns;
        board.description = description;
        board.name = name;
        board.owner = owner;
        board.type = type;
        board.creationDate = new Date().toLocaleDateString();
        return board.save();
    }
}