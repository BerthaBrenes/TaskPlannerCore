import { Repository, EntityRepository } from "typeorm";
import { SysConfig } from "./sysconfig.entity";
import { SysConfigDTO } from "./dto/sysconfig.dto";

@EntityRepository(SysConfig)
export class SysConfigRepository extends Repository<SysConfig>{
    /**
     * Create a new configuration of the system
     * @param data of the sisConfig
     */
    async createConfig(data: SysConfigDTO){
        
        const config = new SysConfig();
        config.lastModifiedBy = data.lastModifiedBy;
        config.boardTypes = data.boardTypes;
        config.systemUses = data.systemUses;
        config.hobbies = data.hobbies;
        config.avatars = data.avatars;
        config.date = Date.now().toString();
        config.save()
        return config;

    }
}