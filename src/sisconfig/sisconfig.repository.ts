import { Repository, EntityRepository } from "typeorm";
import { SisConfigI } from "./sisconfig.entity";

@EntityRepository(SisConfigI)
export class SisConfigRepository extends Repository<SisConfigI>{

}