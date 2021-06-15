import { Injectable } from '@nestjs/common';
import { TareasRepository } from './tareas.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TareasService {
    constructor(
        @InjectRepository(TareasRepository)
        private tareasRepository: TareasRepository){}
}
