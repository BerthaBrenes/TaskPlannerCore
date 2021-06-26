import { MongoRepository, BaseEntity, EntityRepository } from "typeorm";
import { Admin } from "./admins.entity";
import { adminDTO } from "./dto/admin.dto";

@EntityRepository(Admin)
export class AdminRepository extends MongoRepository<Admin>{
    /**
     * 
     * @param data 
     * @param id 
     */
    async createAdmin(data: adminDTO, id: string){
        const {email, name} = data;
        const admin = new Admin();
        admin.email = email;
        admin.name = name;
        admin.userId = id;
        return await admin.save();
    }
}