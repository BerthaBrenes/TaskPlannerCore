import { Injectable, ConflictException } from '@nestjs/common';
import { TableroRepository } from './tableros.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TableroDTO } from './dto/tableros.dto';

@Injectable()
export class TablerosService {

    constructor(
        @InjectRepository(TableroRepository)
        private tableroRepo: TableroRepository
    ) { }

    /**
     * Create a new tablero
     * @param data of the tablero
     */
    async createTablero(data: TableroDTO) {
        const found = await this.tableroRepo.findOne({ where: { name: data.name } });
        if (found) {
            throw new ConflictException(`The tablero with the name ${data.name} already exist`);
        }
        return await this.tableroRepo.createTablero(data);
    }
    /**
     * Delete the tablero
     * @param id of the tablero
     */
    async deleteTablero(id: string) {
        const found = await this.tableroRepo.findOne(id);
        if (found) {
            throw new ConflictException(`The tablero with the id ${id} not found`);
        }
        return await this.tableroRepo.delete(id);
    }
    /**
     * Update tablero 
     * @param id of the tablero
     * @param data to update the tablero
     */
    async updateTablero(id: string, data: TableroDTO) {
        const found = await this.tableroRepo.findOne(id);
        if (found) {
            throw new ConflictException(`The tablero with the id ${id} not found`);
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
        if (found) {
            throw new ConflictException(`The tablero with the owner id ${id} not found`);
        }
        return found;
    }
    /**
     * Get the Columns by a tablero
     * @param id of the tablero
     */
    async getColumns(id: string) {
        const found = await this.tableroRepo.findOne(id);
        if (found) {
            throw new ConflictException(`The tablero with the id ${id} not found`);
        }
        found.columns;
    }
}
