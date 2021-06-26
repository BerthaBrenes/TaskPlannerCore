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
        found.tableroType = type;
        return await found.save();
    }
    /**
     * Set the url of the profile photo
     * @param id of the user
     * @param url of the photo
     */
    async editProfilePhoto(id: string, url: string){
        const found = await this.sisconfigRepository.findOne({where: {idUser: id}});
        if(!found){
            throw new NotFoundException();
        }
        found.profilePhotos = url;
        return await found.save();
    }
}