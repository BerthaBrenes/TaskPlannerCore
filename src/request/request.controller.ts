import { Controller, OnApplicationShutdown } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestService } from './request.service';

@ApiTags('Request')
@Controller('request')
export class RequestController implements OnApplicationShutdown {

    constructor( private readonly requesService: RequestService){}

    onApplicationShutdown(signal: string) {
        console.log(signal); // e.g. "SIGINT"
      }
}
