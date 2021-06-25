import { EntityRepository, MongoRepository } from "typeorm";
import { UserI } from "./users.entity";

@EntityRepository(UserI)
export class UserRepository extends MongoRepository<UserI>{

}