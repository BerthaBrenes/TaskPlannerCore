import { Injectable, Logger, OnModuleInit, NotFoundException } from '@nestjs/common';
import { ColumnsRepository } from './columns.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnsDTO } from './dto/columns.dto';
import { BoardsRepository } from 'src/boards/boards.repository';
/**
 * Injectable
 */
@Injectable()
export class ColumnsService {

    private logger: Logger = new Logger('ColumnsService');

    constructor(
        @InjectRepository(ColumnsRepository)
        private columnsRepository: ColumnsRepository,
        @InjectRepository(BoardsRepository)
        private boardsRepo: BoardsRepository
    ){} 

    async createColumns(data: ColumnsDTO){
        const column = await this.columnsRepository.createColumn(data);
        this.logger.verbose(`response from the database ${column}`);

        const board = await this.boardsRepo.findOne(column.board);
        board.columns.push(column.id);
        await board.save();

        return column;
    }

    async deleteColumn(id: string){
        const find = await this.columnsRepository.findOne(id);
        if(!find){
            throw new NotFoundException(`not found column with id ${id}`);
        }

        const board = await this.boardsRepo.findOne(find.board);
        const index = board.columns.findIndex((element) => element === id);
        board.columns.splice(index, 1);
        await board.save();

        return find.remove();
    }

    async getColumnsByBoard(id: string){
        const find = await this.columnsRepository.find({
            where: {board : id}
        })
        if(!find){
            throw new NotFoundException(`Columns not found for the board id ${id}`)
        }
        return find;
    }
}
