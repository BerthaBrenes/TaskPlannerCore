import { Controller, OnApplicationShutdown } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TareasService } from './tareas.service';

@ApiTags('Tareas')
@Controller('tareas')
export class TareasController implements OnApplicationShutdown{

    constructor( private readonly tareaService: TareasService){}
    onApplicationShutdown(signal: string) {
        console.log(signal); // e.g. "SIGINT"
      }
}
