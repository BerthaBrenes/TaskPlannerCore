import { Injectable, Logger, OnModuleInit, NotFoundException } from '@nestjs/common';
import { ColumnsRepository } from './columns.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnsDTO } from './dto/columns.dto';
/**
 * Injectable
 */
@Injectable()
export class ColumnsService implements OnModuleInit {
    /**
     * Variable for the logger
     */
    private logger: Logger = new Logger('ColumnsService');
    /**
     * First method in constructor
     * @param columnsRepository Controller of column
     */
    constructor(
        @InjectRepository(ColumnsRepository)
        private columnsRepository: ColumnsRepository){} 

    /**
     * Initial module
     */
    async onModuleInit(){

    }
    /**
     * Create a new column in the db
     * @param data of the column
     */
    async createColumns(data: ColumnsDTO){
        let column = await this.columnsRepository.createColumn(data);
        this.logger.verbose(`response from the database ${column}`);
        return column;
    }
    /**
     * Delete the column
     * @param id string of the column
     */
    async deleteColumn(id: string){
        const find = await this.columnsRepository.find({
            where: {id : id}
        })
        if(!find){
            throw new NotFoundException(`not found column with id ${id}`)
        }
        return await this.columnsRepository.delete(id);
    }
    /**
     * Get the column by the tablero id
     * @param id of the tablero
     */
    async getColumnByTablero(id: string){
        const find = await this.columnsRepository.find({
            where: {Tablero : id}
        })
        if(!find){
            throw new NotFoundException(`Columns not found for the tablero id ${id}`)
        }
        return find;
    }
}
