import { Controller, OnApplicationShutdown, Logger, Post, UsePipes, ValidationPipe, Body, Param, Get, Patch } from '@nestjs/common';
import { CollaborationRequestService } from './collaboration-request.service';
import { CollaborationRequestDTO } from './dto/collaboration-request.dto';
import { StatusType } from 'src/data/statusType.enum';

@Controller('collab')
export class CollaborationRequestController implements OnApplicationShutdown {

    private logger: Logger = new Logger('Collaboration Controller');

    constructor(private readonly service: CollaborationRequestService) { }
    

    @Post()
    @UsePipes(ValidationPipe)
    async createColumn(@Body() data: CollaborationRequestDTO) {
        this.logger.verbose(`Create a request`);
        return await this.service.createRequest(data);
    }
    
    
    @Patch('/:id/:status')
    @UsePipes(ValidationPipe)
    async changeStatus(@Param('id') id: string, @Param('status') status: StatusType) {
        return this.service.resolveRequest(id, status);
    }
    
    
    @Get('sent/:id')
    @UsePipes(ValidationPipe)
    async getSentRequests(@Param('id') id: string) {
        this.logger.verbose(`Get the sent requests of ${id}`);
        return await this.service.getSentRequests(id);
    }
    
    
    @Get('received/:id')
    @UsePipes(ValidationPipe)
    async getReceivedRequests(@Param('id') id: string) {
        this.logger.verbose(`Get the received request of ${id}`);
        return await this.service.getReceivedRequests(id);
    }

    /**
   * shutdown the process
   * @param signal event
   */
    onApplicationShutdown(signal: string) {
        console.log(signal); // e.g. "SIGINT"
    }
}
