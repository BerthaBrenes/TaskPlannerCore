import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { BoardsRepository } from './boards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardDTO } from './dto/boards.dto';

@Injectable()
export class BoardsService {

    constructor(
        @InjectRepository(BoardsRepository)
        private tableroRepo: BoardsRepository
    ) { }

    /**
     * Create a new tablero
     * @param data of the tablero
     */
    async createBoard(data: BoardDTO) {
        const found = await this.tableroRepo.findOne({ where: { name: data.name } });
        if (found) {
            throw new ConflictException(`The tablero with the name ${data.name} already exist`);
        }
        return await this.tableroRepo.createBoard(data);
    }
    /**
     * Delete the Board
     * @param id of the Board
     */
    async deleteBoard(id: string) {
        const found = await this.tableroRepo.findOne(id);
        if (!found) {
            throw new NotFoundException(`The Board with the id ${id} not found`);
        }
        return await this.tableroRepo.delete(id);
    }
    /**
     * Update tablero 
     * @param id of the tablero
     * @param data to update the tablero
     */
    async updateTablero(id: string, data: BoardDTO) {
        const found = await this.tableroRepo.findOne(id);
        if (!found) {
            throw new NotFoundException(`The tablero with the id ${id} not found`);
        }
        found.columns = data.columns;
        found.description = data.description;
        found.name = data.name;
        found.owner = data.owner;
        found.type = data.type;
        return found.save();
     }
    /**
     * Get the tablero for the owner
     * @param id of the owner
     */
    async getTByOwner(id: string) {
        const found = await this.tableroRepo.findOne({where: {owner: id}});
        if (!found) {
            throw new NotFoundException(`The tablero with the owner id ${id} not found`);
        }
        return found;
    }
    /**
     * Get the Columns by a tablero
     * @param id of the tablero
     */
    async getColumns(id: string) {
        const found = await this.tableroRepo.findOne(id);
        if (!found) {
            throw new NotFoundException(`The tablero with the id ${id} not found`);
        }
        found.columns;
    }
}
