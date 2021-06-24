import { Injectable } from '@nestjs/common';
import { TareasRepository } from './tareas.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CriticalPath } from 'src/tools/criticalpath';

@Injectable()
export class TareasService {
    constructor(
        @InjectRepository(TareasRepository)
        private tareasRepository: TareasRepository){}

    // TODO: The implementation of the critical path calculation looks like this
    getCriticalPath(){
        CriticalPath.getCriticalPath([]);
    }
}
