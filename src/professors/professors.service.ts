import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { professorRepository } from './professors.repository';
import { professorDTO } from './dto/professor.dto';
import { MongoError } from 'typeorm';
import { User, UserType } from 'src/users/users.entity';
import { UserRepository } from 'src/users/users.repository';

@Injectable()
export class ProfessorsService {
    constructor(
        @InjectRepository(professorRepository)
        private professorRepository: professorRepository,
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
    }
    async createProfessor(data: professorDTO) {
        const found = await this.professorRepository.findOne({ where: { email: data.email } });
        if (found) {
            throw new MongoError(`User with the id ${data.email} already exist`);
        }
        const {name, email} = data;
        const user = new User();
        user.email = email;
        user.name = name;
        user.role = UserType.PROFESSOR;
        const id = (await this.userRepository.createUser(user)).id
        return await this.professorRepository.createProfessor(data, id);
    }
    /**
     * delete an user
     * @param id of the user
     */
    async deleteUser(id: string) {
        const found = await this.professorRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`User with the id ${id} not found`);
        }
        return await this.professorRepository.delete(id);
    }
    /**
     * Update the data of the professor
     * @param id of the user
     * @param data of the professor
     */
    async updateProfessor(id: string, data: professorDTO) {
        const found = await this.professorRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`User with the id ${id} not found`);
        }
        found.name = data.name;
        found.career = data.career;
        found.provinceOfResidence = data.provinceOfResidence;
        found.avatarUrl = data.avatarUrl;
        return await found.save();
    }
    /**
     * Get the data of a professor user
     * @param id of the user
     */
    async getProfessor(id: string){
        const found = await this.professorRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`User with the id ${id} not found`);
        }
        return found;
    } 
    /**
     * Add a tablero id to the user
     * @param id id of the user
     * @param id of the tablero
     */
    async addTableroFriends(id: string, idT: string) {
        const found = await this.professorRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`User with the id ${id} not found`);
        }
        found.shareBoards.push(idT);
        return await found.save();
    } 
º    /**
     * Delete tablero friends of the user
     * @param id of the user
     * @param idT of the tablero
     */
     async deleteTableroFriends(id: string, idT: string) {
         const found = await this.professorRepository.findOne(id);
         if (!found) {
             throw new NotFoundException(`User with the id ${id} not found`);
         }
         const index = found.shareBoards.findIndex((element) => element === idT);
         found.shareBoards.splice(index, 1);
         return await found.save();

     }

}
