import { EntityRepository, MongoRepository } from "typeorm";
import { UserI } from "./users.entity";
import { userDTO } from "./dto/student.dto";
import { serialize } from "v8";
import { professorDTO } from "./dto/profesor.dto";
import { adminDTO } from "./dto/admin.dto";

@EntityRepository(UserI)
export class UserRepository extends MongoRepository<UserI>{
    /**
     * Create an user
     * @param data of the user
     */
    async createStudent(data: userDTO){
        const {Friends, Name,Tableros_Friend, Tableros_Owner, application, career, dni, email, hobbies, license, profile_photo,province_living, province_residence,type} = data;
        const user = new UserI();
        user.friends = Friends;
        user.name = Name;
        user.shared_boards = Tableros_Friend;
        user.my_boards = Tableros_Owner;
        user.application  = application;
        user.career = career;
        user.dni = dni;
        user.hobbies = hobbies;
        user.email = email;
        user.type = type;
        user.province_residence = province_residence;
        user.license = license;
        user.province_living = province_living;
        user.profile_photo = profile_photo;
        return await user.save();
    }
    /**
     * Create a new professor user
     * @param data of the professor
     */
    async createProfessor(data: professorDTO){
        const { Name,  career, dni, email, profile_photo, province_residence} = data;
        const user = new UserI();
        user.name = Name;
        user.career = career;
        user.dni = dni;
        user.email = email;
        user.profile_photo = profile_photo;
        user.province_residence = province_residence;
        return await user.save();
    }

    /**
     * Create a new admin
     * @param data of the admin
     */
    async createAdmin(data: adminDTO){
        const {email} = data;
        const found = new UserI();
        found.email = email;
        return await found.save();
    }
}