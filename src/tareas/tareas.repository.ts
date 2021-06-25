import { Repository, EntityRepository } from "typeorm";
import { TareasI } from "./tareas.entity";
import { tareasDTO } from "./dto/tareas.dto";

@EntityRepository(TareasI)
export class TareasRepository extends Repository<TareasI>{
    /**
     * Create a new tarea
     * @param data of the tarea
     */
    async createTarea(data:tareasDTO){
        const {column, dependency, endDate, name, owner, priority, startDate } = data;
        const tarea = new TareasI();
        tarea.column.id = column;
        tarea.dependency = dependency;
        tarea.endDate = endDate;
        tarea.name = name;
        tarea.owner = owner;
        tarea.priority = priority;
        tarea.startDate = startDate;
        return await tarea.save();
    }
}