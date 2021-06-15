import { Repository, EntityRepository } from "typeorm";
import { UserI } from "./users.entity";

@EntityRepository(UserI)
export class UserRepository extends Repository<UserI>{

}