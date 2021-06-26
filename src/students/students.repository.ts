import { EntityRepository, MongoRepository } from "typeorm";
import { CreateStudentDto } from "./dto/create-student.dto";
import { Student } from "./students.entity";

@EntityRepository(Student)
export class StudentRepository extends MongoRepository<Student>{

    /**
     * Create a new user in the system and then create the student's profile.
     */
    async createStudent(std: CreateStudentDto, id: string): Promise <Student> {
        const {
            name, 
            email,             
            dni, 
            studentCard,
            career, 
            avatarUrl,
            phone,
            provinceOfProvenance, 
            provinceOfResidence, 
            hobbies,
            usesSystemBec
        } = std;

        const student: Student = new Student();
        student.userId = id;
        student.name = name;
        student.email = email;
        student.dni = dni;
        student.studentCard = studentCard;
        student.career = career;
        student.avatarUrl = avatarUrl;
        student.phone = phone;
        student.provinceOfProvenance = provinceOfProvenance;
        student.provinceOfResidence = provinceOfResidence;
        student.hobbies = hobbies;
        student.usesSystemBec = usesSystemBec;
        student.friends = [];
        student.myBoards = [];
        student.sharedBoards = [];

        return student.save();
    }


}