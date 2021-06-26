import { Injectable, NotFoundException } from '@nestjs/common';
import { CollaborationRequestRepository } from './collaboration-request.repository';
import { collaborationRequestDTO } from './dto/collaboration-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { statusType } from 'src/request/dto/statusType.enum';

@Injectable()
export class CollaborationRequestService {
    /**
     * First Method in the component
     * @param requestRepository Controller of the service
     */
    constructor(
        @InjectRepository(CollaborationRequestRepository)
        private requestRepository: CollaborationRequestRepository){}
    
    /**
     * Create a new request
     * @param data of the new request
     */
    async createRequest(data: collaborationRequestDTO){
        return await this.requestRepository.createReq(data);
    }
      /**
     * Change a new status in the request
     * @param id of the request
     * @param status status of the request
     */
    async setStatus(id: string, status: statusType){
        const found = await this.requestRepository.findOne({id});
        if(!found){
            throw new NotFoundException(`Request with the id ${id} not found`)
        }
        found.status = status;
        found.save();
        return found;
    }
    /**
     * Get the request
     * @param id of the user from the request is
     */
    async getRequestByFrom(id: string){
        const found = await this.requestRepository.find({where: {fromUserId: id}});
        if(!found){
            throw new NotFoundException(`Request with the id ${id} not found`)
        }
        return found;
    }
    /**
     * Get the request
     * @param id of the user the request have been made
     */
    async getRequestBy(id: string){
        const found = await this.requestRepository.find({where: {toUserId: id}});
        if(!found){
            throw new NotFoundException(`Request with the id ${id} not found`)
        }
        return found;
    }

}
