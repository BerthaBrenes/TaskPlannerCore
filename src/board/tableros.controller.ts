import { Controller, OnApplicationShutdown } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TablerosService } from './tableros.service';

@ApiTags('Tableros')
@Controller('tableros')
export class TablerosController implements OnApplicationShutdown {
    constructor(private readonly tableroService:TablerosService){}
    onApplicationShutdown(signal: string) {
        console.log(signal); // e.g. "SIGINT"
      }
}
