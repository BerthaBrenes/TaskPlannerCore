import { Repository, EntityRepository } from "typeorm";
import { TareasI } from "./tareas.entity";

@EntityRepository(TareasI)
export class TareasRepository extends Repository<TareasI>{

}