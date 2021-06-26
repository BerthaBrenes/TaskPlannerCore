import { Injectable, ConflictException, NotFoundException, Logger } from '@nestjs/common';
import { BoardsRepository } from './boards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardDTO } from './dto/boards.dto';
import { StudentRepository } from 'src/students/students.repository';

@Injectable()
export class BoardsService {

    constructor(
        @InjectRepository(BoardsRepository)
        private repository: BoardsRepository,
        @InjectRepository(StudentRepository)
        private stdRepository: StudentRepository
    ) { }


    async createBoard(data: BoardDTO) {
        const found = await this.repository.findOne({ where: { name: data.name } });
        if (found) {
            throw new ConflictException(`The board with the name ${data.name} already exist`);
        }

        const board = await this.repository.createBoard(data);
        const user = await this.stdRepository.findOne(data.owner);
        user.myBoards.push(found.id);
        await user.save();

        return board;
    }

    async deleteBoard(id: string) {
        const found = await this.repository.findOne(id);
        if (!found) {
            throw new NotFoundException(`The Board with the id ${id} not found`);
        }

        const user = await this.stdRepository.findOne(found.owner);
        const index = user.myBoards.findIndex((element) => element === id);
        user.myBoards.splice(index, 1);
        await user.save();

        return found.remove();
    }

    async updateBoard(id: string, data: { description, name }) {
        const found = await this.repository.findOne(id);
        if (!found) {
            throw new NotFoundException(`The board with the id ${id} not found`);
        }
        found.description = data.description;
        found.name = data.name;
        return found.save();
    }

    async addColumn(id: string, column: any) {
        const found = await this.repository.findOne(id);
        if (!found) {
            throw new NotFoundException(`The board with the id ${id} not found`);
        }
        found.columns.push(column);
        return found.save();
    }


    async getBoards(id: string) {
        const found = await this.repository.find({ where: { owner: id } });
        if (!found) {
            throw new NotFoundException(`There are no boards with the owner id ${id} not found`);
        }
        return found;
    }


    async getBoard(id: string) {
        const found = await this.repository.findOne(id);
        if (!found) {
            throw new NotFoundException(`The board with the id ${id} not found`);
        }
        return found;
    }
}