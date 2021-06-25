import { Repository, EntityRepository } from "typeorm";
import { UserI } from "./users.entity";
import { userDTO } from "./dto/student.dto";
import { serialize } from "v8";
import { professorDTO } from "./dto/profesor.dto";
import { adminDTO } from "./dto/admin.dto";

@EntityRepository(UserI)
export class UserRepository extends Repository<UserI>{
    /**
     * Create an user
     * @param data of the user
     */
    async createStudent(data: userDTO){
        const {Friends,Lastname_1, Lastname_2, Name_1, Name_2,Tableros_Friend, Tableros_Owner, application, canton, career, district, dmi, email, hobbies, license, password, profile_photo,province_living, province_residence,type} = data;
        const user = new UserI();
        user.Friends = Friends;
        user.Lastname_1 = Lastname_1;
        user.Lastname_2 = Lastname_2;
        user.Name_1 = Name_1;
        user.Name_2 = Name_2;
        user.Tableros_Friend = Tableros_Friend;
        user.Tableros_Owner = Tableros_Owner;
        user.application = application;
        user.canton = canton;
        user.career = career;
        user.district = district;
        user.dmi = dmi;
        user.hobbies = hobbies;
        user.email = email;
        user.type = type;
        user.province_residence = province_residence;
        user.license = license;
        user.password = password;
        user.province_living = province_living;
        user.profile_photo = profile_photo;
        return await user.save();
    }
    /**
     * Create a new professor user
     * @param data of the professor
     */
    async createProfessor(data: professorDTO){
        const {Lastname_1, Lastname_2, Name_1, Name_2, canton, career, district, dmi, email, password, profile_photo, province_residence} = data;
        const user = new UserI();
        user.Lastname_1 = Lastname_1;
        user.Lastname_2 = Lastname_2;
        user.Name_1 = Name_1;
        user.Name_2 = Name_2;
        user.canton = canton;
        user.career = career;
        user.district = district;
        user.dmi = dmi;
        user.email = email;
        user.password = password;
        user.profile_photo = profile_photo;
        user.province_residence = province_residence;
        return await user.save();
    }

    /**
     * Create a new admin
     * @param data of the admin
     */
    async createAdmin(data: adminDTO){
        const {email, password} = data;
        const found = new UserI();
        found.email = email;
        found.password = password;
        return await found.save();
    }
}