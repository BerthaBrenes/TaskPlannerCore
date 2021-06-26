import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserType } from 'src/users/users.entity';
import { UserRepository } from 'src/users/users.repository';
import { CreateStudentDto } from './dto/create-student.dto';
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

    
    async addFriend(id: string, friendId: string) {
        const found = await this.stdRepository.findOne(id);
        found.friends.push(friendId);
        return found.save();
    }
}
