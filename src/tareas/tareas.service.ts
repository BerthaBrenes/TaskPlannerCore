import { Injectable, NotFoundException } from '@nestjs/common';
import { TareasRepository } from './tareas.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TareasDTO } from './dto/tareas.dto';
import { PriorityType } from './dto/priorityType.enum';
import { ColumnsRepository } from 'src/columns/columns.repository';

@Injectable()
export class TareasService {
    
    constructor(
        @InjectRepository(TareasRepository)
        private tareasRepository: TareasRepository,
        @InjectRepository(ColumnsRepository)
        private colRepository: ColumnsRepository    
    ) { }


    async createTarea(data: TareasDTO) {
        const task = await this.tareasRepository.createTarea(data);
        const col = await this.colRepository.findOne(task.column);
        col.tasks.push(task.id);
        await col.save();

        return task;
    }

    async getTareaByColumn(id: string) {
        const found = await this.tareasRepository.find({ where: { column: id } });
        if (!found) {
            throw new NotFoundException(`There is not tareas for the column ${id}`)
        }
        return found;
    }

    async getTareasByOwner(id: string) {
        const found = await this.tareasRepository.find({ where: { owner: id } });
        if (!found) {
            throw new NotFoundException(`There is not tareas for the owner ${id}`)
        }
        return found;
    }

    async delete(id: string) {
        const task = await this.tareasRepository.findOne(id);
        if (!task) {
            throw new NotFoundException(`There is not tarea ${id}`)
        }

        const col = await this.colRepository.findOne(task.column);
        const index = col.tasks.findIndex((element) => element === id);
        col.tasks.splice(index, 1);
        await col.save();

        return this.tareasRepository.delete(id);
    }

    async updateTarea(id: string, data: {dependency, endDate, name, owner, priority}) {
        const found = await this.tareasRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`There is not tarea ${id}`)
        }
        found.dependency = data.dependency;
        found.endDate = data.endDate;
        found.name = data.name;
        found.owner = data.owner;
        found.priority = data.priority;
        return found.save();
    }

    async addDependency(id: string, dependency: string) {
        const found = await this.tareasRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`There is not tarea ${id}`)
        }
        found.dependency.push(dependency);
        return found.save();
    }

    async changeColumn(id: string, idColumn: string) {
        const found = await this.tareasRepository.findOne(id);
        const prevCol = await this.colRepository.findOne(found.column);
        const newCol = await this.colRepository.findOne(idColumn);

        if (!found) {
            throw new NotFoundException(`There is not tarea ${id}`)
        }


        const index = prevCol.tasks.findIndex((element) => element === id);
        prevCol.tasks.splice(index, 1);
        newCol.tasks.push(id);

        await prevCol.save();
        await newCol.save();
        
        found.column.id = idColumn;
        await found.save();
    }
   
    async changePriority(id: string, type: PriorityType) {
        const found = await this.tareasRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`There is not tarea ${id}`)
        }
        found.priority = type;
        return found.save();
    }
}
