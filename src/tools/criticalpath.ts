import { TareasI } from "src/tareas/tareas.entity";

export class CriticalPath {

    static const
    static getCriticalPath(tasks: TareasI[]): TareasI[] {
        
        tasks.forEach(task => {
            console.log(task);

        });
        return [];
    }
}
