import { Repository, EntityRepository } from "typeorm";
import { SisConfigI } from "./sisconfig.entity";
import { sisconfigDTO } from "./dto/sisconfig.dto";

@EntityRepository(SisConfigI)
export class SisConfigRepository extends Repository<SisConfigI>{
    /**
     * Create a new configuration of the system
     * @param data of the sisConfig
     */
    async createConfig(data: sisconfigDTO){
       const {applications, hobbies, idUser, tableroType, profilePhotos} = data;
        const config = new SisConfigI();
        config.applications = applications;
        config.hobbies = hobbies;
        config.idUser = idUser;
        config.profilePhotos = profilePhotos;
        config.tableroType = tableroType;
        config.save()
        return config;

    }
}