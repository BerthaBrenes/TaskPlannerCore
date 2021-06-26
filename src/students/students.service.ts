import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserType } from 'src/users/users.entity';
import { UserRepository } from 'src/users/users.repository';
import { CreateStudentDto } from './dto/create-student.dto';
import { EditStudentDto } from './dto/edit-student.dto';
import { Student } from './students.entity';
import { StudentRepository } from './students.repository';

@Injectable()
export class StudentsService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @InjectRepository(StudentRepository)
        private stdRepository: StudentRepository

    ) { }

    async createStudent(data: CreateStudentDto): Promise<Student> {
        const {name, email} = data;

        // First create the user
        const user: User = new User();
        user.email = email;
        user.name = name;
        user.role = UserType.STUDENT;

        const id = (await this.userRepository.createUser(user)).id;

        return this.stdRepository.createStudent(data,id);
    }


    async getProfile(id: string){
        const found = await this.stdRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Student with the id ${id} not found`);
        }
        return found;
    }


    async deleteProfile(id: string): Promise<Student> {
        const found = await this.stdRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Student with the id ${id} not found`);
        }
        await this.userRepository.delete({id: found.userId});
        await this.stdRepository.delete({id: found.id});
        return found;
    }


    async editProfile(id: string, data: EditStudentDto) {
        const found = await this.stdRepository.findOne(id);
        
        if (!found) {
            throw new NotFoundException(`User with the id ${id} not found`);
        }
        
        found.name = data.name;
        found.phone = data.phone;
        found.provinceOfResidence = data.provinceOfResidence;
        found.provinceOfProvenance = data.provinceOfProvenance;
        found.avatarUrl = data.avatarUrl;

        return found.save();
    }
}
