import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessorRepository } from './professors.repository';
import { ProfessorDTO } from './dto/professor.dto';
import { MongoError } from 'typeorm';
import { User, UserType } from 'src/users/users.entity';
import { UserRepository } from 'src/users/users.repository';

@Injectable()
export class ProfessorsService {
    
    constructor(
        @InjectRepository(ProfessorRepository)
        private professorRepository: ProfessorRepository,
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) { }


    async createProfessor(data: ProfessorDTO) {
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
        
        return this.professorRepository.createProfessor(data, id);
    }
    
    
    /**
     * delete an user
     * @param id of the user
     */
    async deleteProfile(id: string) {
        const found = await this.professorRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`User with the id ${id} not found`);
        }
        await this.userRepository.delete({id: found.userId});
        return this.professorRepository.delete({id: found.id});
    }
    
    
    /**
     * Update the data of the professor
     * @param id of the user
     * @param data of the professor
     */
    async editProfile(id: string, data: ProfessorDTO) {
        const found = await this.professorRepository.findOne(id);
        
        if (!found) {
            throw new NotFoundException(`User with the id ${id} not found`);
        }
        
        found.name = data.name;
        found.career = data.career;
        found.provinceOfResidence = data.provinceOfResidence;
        found.avatarUrl = data.avatarUrl;

        return found.save();
    }
    
    
    /**
     * Get the data of a professor user
     * @param id of the user
     */
    async getProfile(id: string){
        const found = await this.professorRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Professor with the id ${id} not found`);
        }
        return found;
    }


    /**
     * Add a shared board to the user
     * @param uid ID of the user
     * @param boardId ID of the board
     */
    async addSharedBoard(uid: string, boardId: string) {
        const found = await this.professorRepository.findOne(uid);
        if (!found) {
            throw new NotFoundException(`User with the id ${uid} not found`);
        }
        found.sharedBoards.push(boardId);
        return found.save();
    } 
    
    
    /**
     * Delete a shared board of the professor
     * @param uid ID of the user
     * @param boardId ID of the board
     */
     async deleteSharedBoard(uid: string, boardId: string) {
         const found = await this.professorRepository.findOne(uid);
         if (!found) {
             throw new NotFoundException(`User with the id ${uid} not found`);
         }
         const index = found.sharedBoards.findIndex((element) => element === boardId);
         found.sharedBoards.splice(index, 1);
         return found.save();
     }

}
