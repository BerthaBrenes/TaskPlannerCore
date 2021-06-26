import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminRepository } from './admins.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/users.repository';
import { adminDTO } from './dto/admin.dto';
import { MongoError } from 'typeorm';
import { User, UserType } from 'src/users/users.entity';
@Injectable()
export class AdminsService {
    /**
     * First method in the service
     * @param userRepository Controller for the user repository
     */
    constructor(
        @InjectRepository(AdminRepository)
        private adminRepository: AdminRepository,
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
    }
    async createAdmin(data: adminDTO){
        const found = await this.adminRepository.findOne({ where: { email: data.email } });
        if (found) {
            throw new MongoError(`User with the id ${data.email} already exist`);
        }
        const {name, email} = data;
        const user = new User();
        user.email = email;
        user.name = name;
        user.role = UserType.ADMIN;
        const id = (await this.userRepository.createUser(user)).id
        return this.adminRepository.createAdmin(data, id);
    }
    /**
     * delete an user
     * @param id of the user
     */
    async deleteUser(id: string) {
        const found = await this.adminRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`User with the id ${id} not found`);
        }
        return await this.adminRepository.delete(id);
    } 
    /**
     * Validate the email exist
     * @param email of the user
     */
    async getAdmin(id: string) {
        const found = await this.adminRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`User with the id ${id} not found`);
        }
        return found;
    }
}
