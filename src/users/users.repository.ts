import { EntityRepository, MongoError, MongoRepository } from "typeorm";
import { User } from "./users.entity";

@EntityRepository(User)
export class UserRepository extends MongoRepository<User>{

    /**
     * Create an user
     * @param newUser data of the user
     */
    async createUser(newUser: User): Promise<User> {
        return newUser.save();
    }

    /**
     * Removes a user from the system.
     * @param userId user id.
     */
    async deleteUser(userId: string): Promise<any> {
        const user = this.findOne({id: userId});

        if (!user)
            throw new MongoError('User cannot be deleted');

        return this.deleteUser(userId);
    }


}