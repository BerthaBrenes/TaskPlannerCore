import { Body, Controller, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
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
}
