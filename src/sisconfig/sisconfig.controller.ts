import { Controller, OnApplicationShutdown } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SisconfigService } from './sisconfig.service';

@ApiTags('System Configuration')
@Controller('sisconfig')
export class SisconfigController implements OnApplicationShutdown{

    constructor(private readonly sisconfigService: SisconfigService){}

    onApplicationShutdown(signal: string) {
        console.log(signal); // e.g. "SIGINT"
      }

}

