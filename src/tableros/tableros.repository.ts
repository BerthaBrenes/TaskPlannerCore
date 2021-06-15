import { Repository, EntityRepository } from "typeorm";
import { TablerosI } from "./tableros.entity";

@EntityRepository(TablerosI)
export class TableroRepository extends Repository<TablerosI>{

}