import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
/**
 * Injectable
 */
@Injectable()
export class UsersService {
    // constructor(
    //     @InjectRepository(UserRepository)
    //     private userRepository: UserRepository
    // ) {
    // }
    // /**
    //  * Create an user
    //  * @param data of the user
    //  */
    // async createStudent(data: userDTO) {
    //     const found = await this.userRepository.findOne({ where: { email: data.email } });
    //     if (found) {
    //         throw new ConflictException(`User with the id ${data.email} already exist`);
    //     }
    //     return await this.userRepository.createStudent(data);
    // }
    // /**
    //  * Create a professor user
    //  * @param data of the user
    //  */
    // async createProfessor(data: professorDTO) {
    //     const found = await this.userRepository.findOne({ where: { email: data.email } });
    //     if (found) {
    //         throw new ConflictException(`User with the id ${data.email} already exist`);
    //     }
    //     return await this.userRepository.createProfessor(data);
    // }
    // /**
    //  * Create an admin user
    //  * @param data of the user
    //  */
    // async createAdmin(data: adminDTO) {
    //     const found = await this.userRepository.findOne({ where: { email: data.email } });
    //     if (found) {
    //         throw new ConflictException(`User with the id ${data.email} already exist`);
    //     }
    //     return await this.userRepository.createAdmin(data);
    // }
    // /**
    //  * delete an user
    //  * @param id of the user
    //  */
    // async deleteUser(id: string) {
    //     const found = await this.userRepository.findOne(id);
    //     if (!found) {
    //         throw new NotFoundException(`User with the id ${id} not found`);
    //     }
    //     return await this.userRepository.delete(id);
    // }
    // /**
    //  * Update the data of the student
    //  * @param id of the user
    //  * @param data of the student
    //  */
    // async updateStudent(id: string, data: userDTO) {
    //     const found = await this.userRepository.findOne(id);
    //     if (!found) {
    //         throw new NotFoundException(`User with the id ${id} not found`);
    //     }
    //     found.name = data.Name;
    //     found.career = data.career;
    //     found.province_living = data.province_living;
    //     found.profile_photo = data.profile_photo;
    //     return await found.save()
    // }
    // /**
    //  * Update the data of the professor
    //  * @param id of the user
    //  * @param data of the professor
    //  */
    // async updateProfessor(id: string, data: professorDTO) {
    //     const found = await this.userRepository.findOne(id);
    //     if (!found) {
    //         throw new NotFoundException(`User with the id ${id} not found`);
    //     }
    //     found.name = data.Name;
    //     found.career = data.career;
    //     found.province_residence = data.province_residence;
    //     found.profile_photo = data.profile_photo;
    //     return await found.save();
    // }
    // /**
    //  * Validate the email exist
    //  * @param email of the user
    //  */
    // async validateUser(email: string) {
    //     const found = await this.userRepository.findOne({ where: { email: email } });
    //     if (!found) {
    //         throw new NotFoundException(`User with the email ${email} not found`);
    //     }
    //     return found;
    // }
    // /**
    //  * Add new friends to the current list
    //  * @param id of the user
    //  * @param friends id of the friends
    //  */
    // async addFriends(id: string, friends: any) {
    //     const found = await this.userRepository.findOne(id);
    //     if (!found) {
    //         throw new NotFoundException(`User with the id ${id} not found`);
    //     }
    //     found.friends.push(friends);
    //     return await found.save();
    // }
    // /**
    //  * Delete friends of the user
    //  * @param id of the user
    //  * @param idF of the friends
    //  */
    // async deleteFriend(id: string, idF: string) {
    //     const found = await this.userRepository.findOne(id);
    //     if (!found) {
    //         throw new NotFoundException(`User with the id ${id} not found`);
    //     }
    //     const index = found.friends.findIndex((element) => element === idF);
    //     found.friends.splice(index, 1);
    //     return await found.save();

    // }
    // /**
    //  * Add a tablero id to the user
    //  * @param id id of the user
    //  * @param id of the tablero
    //  */
    // async addTableroOwner(id: string, idT: string) {
    //     const found = await this.userRepository.findOne(id);
    //     if (!found) {
    //         throw new NotFoundException(`User with the id ${id} not found`);
    //     }
    //     found.my_boards.push(idT);
    //     return await found.save();
    // }
    // /**
    //  * Delete tablero of the user
    //  * @param id of the user
    //  * @param idT of the tablero
    //  */
    // async deleteTableroOwner(id: string, idT: string) {
    //     const found = await this.userRepository.findOne(id);
    //     if (!found) {
    //         throw new NotFoundException(`User with the id ${id} not found`);
    //     }
    //     const index = found.my_boards.findIndex((element) => element === idT);
    //     found.my_boards.splice(index, 1);
    //     return await found.save();

    // }
    // /**
    // * Delete tablero friends of the user
    // * @param id of the user
    // * @param idT of the tablero
    // */
    // async deleteTableroFriends(id: string, idT: string) {
    //     const found = await this.userRepository.findOne(id);
    //     if (!found) {
    //         throw new NotFoundException(`User with the id ${id} not found`);
    //     }
    //     const index = found.shared_boards.findIndex((element) => element === idT);
    //     found.shared_boards.splice(index, 1);
    //     return await found.save();

    // }
    // /**
    //  * Add a tablero id to the user
    //  * @param id id of the user
    //  * @param id of the tablero
    //  */
    // async addTableroFriends(id: string, idT: string) {
    //     const found = await this.userRepository.findOne(id);
    //     if (!found) {
    //         throw new NotFoundException(`User with the id ${id} not found`);
    //     }
    //     found.shared_boards.push(idT);
    //     return await found.save();
    // }
    // /**
    //  * Edit the url of the profile photo
    //  * @param id of the user
    //  * @param url of the profile photo
    //  */
    // async editProfilePhoto(id: string, url: string) {
    //     const found = await this.userRepository.findOne(id);
    //     if (!found) {
    //         throw new NotFoundException(`User with the id ${id} not found`);
    //     }
    //     found.profile_photo = url;
    //     return await found.save();
    // }
}
