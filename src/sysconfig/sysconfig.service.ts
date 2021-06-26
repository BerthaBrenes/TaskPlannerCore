import { Injectable, NotFoundException } from '@nestjs/common';
import { SysConfigRepository } from './sysconfig.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SysConfigDTO } from './dto/sysconfig.dto';
import { tableroType } from 'src/boards/dto/tableroType.enum';
/**
 * Injectable
 */
@Injectable()
export class SysConfigService {
    /**
     * First method in the service
     * @param sisconfigRepository Controller for the repo
     */
    constructor(
        @InjectRepository(SysConfigRepository)
        private sisconfigRepository: SysConfigRepository
    ){}

    /**
     * Get the system configuration
     * @param id string of the user 
     */
    async getConfig(id: string){
        const config = await this.sisconfigRepository.findOne({where: {idUser: id}});
        if(!config){
            throw new NotFoundException();
        }
        return config;
    }
    /**
     * Create a new config system
     * @param data of the config
     */
    async CreateConfig(data: SysConfigDTO){
        return await this.sisconfigRepository.createConfig(data);
    }
    /**
     * Delete a config by the user
     * @param id of the user
     */
    async deleteConfig(id: string){
        const found = await this.sisconfigRepository.findOne({where: {idUser: id}});
        if(!found){
            throw new NotFoundException();
        }
        return this.sisconfigRepository.delete(id);
    }
    /**
     * Add a type of the tablero
     * @param id of the user
     * @param type of the tablero
     */
    async addTableroType(id:string, type: tableroType){
        const found = await this.sisconfigRepository.findOne({where: {idUser: id}});
        if(!found){
            throw new NotFoundException();
        }
        //found.tableroType = type;
        //return await found.save();
    }
    /**
     * Get the board types for the config
     */
    async getBoardTypes(){
        const found = await this.sisconfigRepository.findOne({where: {},select: ["boardTypes"],order:{id:-1}})
        return found;
    }
    /**
     * Get the hobbies for the config
     */
    async getHobbies(){
        const found = await this.sisconfigRepository.findOne({where: {},select: ["hobbies"],order:{id:-1}});
        return found;
    }
    /**
     * Get the sysUser
     */
    async getSysUser(){
        const found = await this.sisconfigRepository.findOne({where: {},select: ["systemUses"],order:{id:-1}})
        return found;
    }
    /**
     * Get the avatars
     */
    async getAvatar(){
        const found = await this.sisconfigRepository.findOne({where: {},select: ["avatars"],order:{id:-1}});
        return found;  
    }
    async editBoardTypes(types: string[], lastModifi: string){
        const found = await this.sisconfigRepository.findOne({where: {},order:{id:-1}});
        found.lastModifiedBy = lastModifi;
        found.boardTypes = types;
        return found.save();
    }
    async editHobbies(hobbies: string[], lastModifi: string){
        const found = await this.sisconfigRepository.findOne({where: {},order:{id:-1}});
        if(!found){
            throw new NotFoundException();
        }
        found.lastModifiedBy = lastModifi;
        found.hobbies = hobbies;
        return found.save();
    }
    async editSystemUser(sysUsers: string[], lastModifi: string){
        const found = await this.sisconfigRepository.findOne({where: {},order:{id:-1}});
        if(!found){
            throw new NotFoundException();
        }
        found.lastModifiedBy = lastModifi;
        found.systemUses = sysUsers;
        return found.save();
    }
    async editAvatarList(avatars: string[], lastModifi: string){
        const found = await this.sisconfigRepository.findOne({where: {},order:{id:-1}});
        if(!found){
            throw new NotFoundException();
        }
        found.lastModifiedBy = lastModifi;
        found.avatars = avatars;
        return found.save();
    }

}
