import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { EditStudentDto } from './dto/edit-student.dto';
import { Student } from './students.entity';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {

    private logger = new Logger('Students Controller');

    constructor(
        private service: StudentsService
    ) { }

    @Post()
    @UsePipes(ValidationPipe)
    createStudent(@Body() data: CreateStudentDto): Promise<Student> {
        this.logger.verbose(`Create new student attempt with identity: ${JSON.stringify(data.email)}`);
        return this.service.createStudent(data);
    }

    @Get('/:id')
    getProfile(@Param('id') id: string): Promise<Student> {
        this.logger.verbose(`Get student's ${id} profile data`);
        return this.service.getProfile(id);
    }

    @Get('user/:email')
    getUserProfile(@Param('email') email: string): Promise<Student> {
        this.logger.verbose(`Get user's ${email} profile data`);
        return this.service.getUserProfile(email);
    }

    @Delete('/:id')
    deleteProfile(@Param('id') id: string): Promise<Student> {
        this.logger.verbose(`Delete user's ${id} profile`);
        return this.service.deleteProfile(id);
    }

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    editProfile(@Param('id') id: string, @Body() data: EditStudentDto): Promise<Student> {
        this.logger.verbose(`Edit user's ${id} profile data`);
        return this.service.editProfile(id,data);
    }    
}
