import { Injectable, NotFoundException } from '@nestjs/common';
import { SysConfigRepository } from './sysconfig.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SysConfigDTO } from './dto/sysconfig.dto';


@Injectable()
export class SysConfigService {


    constructor(
        @InjectRepository(SysConfigRepository)
        private sysConfigRepository: SysConfigRepository
    ){}


    async getConfig(id: string){
        const config = await this.sysConfigRepository.findOne({where: {idUser: id}});
        if(!config){
            throw new NotFoundException();
        }
        return config;
    }


    async CreateConfig(data: SysConfigDTO){
        return this.sysConfigRepository.createConfig(data);
    }

    
    async getBoardTypes(){
        const found = await this.sysConfigRepository.findOne({where: {},select: ["boardTypes"],order:{id:-1}})
        return found.boardTypes;
    }

    async getHobbies(){
        const found = await this.sysConfigRepository.findOne({where: {},select: ["hobbies"],order:{id:-1}});
        return found.hobbies;
    }

    async getSysUses(){
        const found = await this.sysConfigRepository.findOne({where: {},select: ["systemUses"],order:{id:-1}})
        return found.systemUses;
    }

    async getAvatarList(){
        const found = await this.sysConfigRepository.findOne({where: {},select: ["avatars"],order:{id:-1}});
        return found.avatars;  
    }


    async editBoardTypes(types: string[], by: string){
        const found = await this.sysConfigRepository.findOne({where: {},order:{id:-1}});
        found.lastModifiedBy = by;
        found.boardTypes = types;
        return found.save();
    }

    async editHobbies(hobbies: string[], by: string){
        const found = await this.sysConfigRepository.findOne({where: {},order:{id:-1}});
        if(!found){
            throw new NotFoundException();
        }
        found.lastModifiedBy = by;
        found.hobbies = hobbies;
        return found.save();
    }

    async editSystemUses(sysUsers: string[], by: string){
        const found = await this.sysConfigRepository.findOne({where: {},order:{id:-1}});
        if(!found){
            throw new NotFoundException();
        }
        found.lastModifiedBy = by;
        found.systemUses = sysUsers;
        return found.save();
    }

    async editAvatarList(avatars: string[], by: string){
        const found = await this.sysConfigRepository.findOne({where: {},order:{id:-1}});
        if(!found){
            throw new NotFoundException();
        }
        found.lastModifiedBy = by;
        found.avatars = avatars;
        return found.save();
    }

}
