import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AdminRepository } from './admins.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/users.repository';
import { AdminDTO } from './dto/admin.dto';
import { MongoError } from 'typeorm';
import { User, UserType } from 'src/users/users.entity';

@Injectable()
export class AdminsService {

    constructor(
        @InjectRepository(AdminRepository)
        private adminRepository: AdminRepository,
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) { }
    
    
    async createAdmin(data: AdminDTO){
        const found = await this.adminRepository.findOne({ where: { email: data.email } });
        if (found) {
            throw new MongoError(`Admin with the id ${data.email} already exist`);
        }
        
        const {name, email} = data;
        const user = new User();
        user.email = email;
        user.name = name;
        user.role = UserType.ADMIN;
        
        const id = (await this.userRepository.createUser(user)).id
        return this.adminRepository.createAdmin(data, id);
    }
    
    
    async deleteAdmin(id: string) {

        if (id === '60d679252e0e2b76eaad0472')
            throw new ForbiddenException(`The main administrator cannot be removed`);

        const found = await this.adminRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Admin with the id ${id} not found`);
        }
        await this.userRepository.delete(found.userId);
        return this.adminRepository.delete(id);
    } 
    
    
    async getAdmin(id: string) {
        const found = await this.adminRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Admin with the id ${id} not found`);
        }
        return found;
    }
}
