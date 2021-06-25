import { MongoRepository, EntityRepository, MongoError } from "typeorm";
import { Professor } from "./professors.entity";
import { professorDTO } from "./dto/professor.dto";

@EntityRepository(Professor)
export class professorRepository extends MongoRepository<Professor>{

    async createProfessor(data: professorDTO, id: string): Promise<Professor>{
        const {avatarUrl, career, dni, email, name, provinceOfResidence, shareBoards} = data;
        const professor = new Professor();
        professor.avatarUrl = avatarUrl;
        professor.career = career;
        professor.dni = dni;
        professor.userId = id;
        professor.email = email;
        professor.name = name;
        professor.provinceOfResidence = provinceOfResidence;
        professor.shareBoards = shareBoards;
        return await professor.save();
    }
    deleteProfessor(id: string){
        const found = this.findOne(id);
        if(!found){
            throw new MongoError('User not found');
        }
        return this.delete(id);
    }
}