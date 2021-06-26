import { Injectable, NotFoundException } from '@nestjs/common';
import { TareasRepository } from './tareas.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { tareasDTO } from './dto/tareas.dto';
import { priorityType } from './dto/priorityType.enum';
import { CriticalPath } from 'src/tools/criticalpath';

@Injectable()
export class TareasService {
    constructor(@InjectRepository(TareasRepository)
    private tareasRepository: TareasRepository) { }
    // TODO: The implementation of the critical path calculation looks like this
    /**
     * Critical path
     */
    getCriticalPath(){
        CriticalPath.getCriticalPath([]);
    }
    /**
     * Create a new tarea
     * @param data of the tareas
     */
    async createTarea(data: tareasDTO) {
        return await this.tareasRepository.createTarea(data);
    }
    /**
     * Get the tarea by the column
     * @param id of the column
     */
    async getTareaByColumn(id: string) {
        const found = await this.tareasRepository.find({ where: { column: id } });
        if (!found) {
            throw new NotFoundException(`There is not tareas for the column ${id}`)
        }
        return found;
    }
    /**
     * Get the tareas by the owner
     * @param id of the owner
     */
    async getTareasByOwner(id: string) {
        const found = await this.tareasRepository.find({ where: { owner: id } });
        if (!found) {
            throw new NotFoundException(`There is not tareas for the owner ${id}`)
        }
        return found;
    }
    /**
     * Delete a tarea
     * @param id of the tarea
     */
    async delete(id: string) {
        const found = await this.tareasRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`There is not tarea ${id}`)
        }
        return this.tareasRepository.delete(id);
    }
    /**
     * Update the data of a tarea
     * @param id of the tarea
     * @param data of the tarea
     */
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
        return await found.save();
    }
    /**
     * Add a dependency in the tarea
     * @param id of the tarea
     * @param dependency id of another tareas that has dependency
     */
    async addDependency(id: string, dependency: string) {
        const found = await this.tareasRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`There is not tarea ${id}`)
        }
        found.dependency.push(dependency);
        return await found.save()
    }
    /**
     * Change the column of a tarea
     * @param id of the tarea
     * @param idColumn of the column
     */
    async changeColumn(id: string, idColumn: string) {
        const found = await this.tareasRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`There is not tarea ${id}`)
        }
        found.column.id = idColumn;
        await found.save();

    }
    /**
     * Change the priority of the tarea
     * @param id of the tarea
     * @param type of the tarea
     */
    async changePriority(id: string, type: priorityType) {
        const found = await this.tareasRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`There is not tarea ${id}`)
        }
        found.priority = type;
        return await found.save();
    }
}
