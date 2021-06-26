import { EntityRepository, MongoRepository } from "typeorm";
import { TareasI } from "./tareas.entity";
import { TareasDTO } from "./dto/tareas.dto";

@EntityRepository(TareasI)
export class TareasRepository extends MongoRepository<TareasI>{

    async createTarea(data:TareasDTO){
        const {column, dependency, endDate, name, owner, priority, startDate } = data;
        
        const task = new TareasI();
        task.column.id = column;
        task.dependency = dependency;
        task.endDate = endDate;
        task.name = name;
        task.owner = owner;
        task.priority = priority;
        task.startDate = startDate;

        return task.save();
    }
}