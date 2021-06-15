import { Controller, OnApplicationShutdown } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ColumnsService } from './columns.service';


@ApiTags('Columns')
@Controller('columns')
export class ColumnsController implements OnApplicationShutdown {

    constructor(private readonly columnService: ColumnsService){}
    
    onApplicationShutdown(signal: string) {
        console.log(signal); // e.g. "SIGINT"
      }
}
