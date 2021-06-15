import { Repository, EntityRepository } from "typeorm";
import { ColumnI } from "./columns.entity";

@EntityRepository(ColumnI)
export class ColumnsRepository extends Repository<ColumnI>{

}