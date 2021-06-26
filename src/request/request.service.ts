import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestRepository } from './request.repository';
import { requestDTO } from './dto/request.dto';
import { statusType } from './dto/statusType.enum';
/**
 * Injectable
 */
@Injectable()
export class RequestService {
    /**
     * First Method in the component
     * @param requestRepository Controller of the service
     */
    constructor(
        @InjectRepository(RequestRepository)
        private requestRepository: RequestRepository){}
    
    /**
     * Create a new request
     * @param data of the new request
     */
    async createRequest(data: requestDTO){
        return await this.requestRepository.createReq(data);
    }
    /**
     * Delete a request with the id
     * @param id of the request
     */
    async deleteRequest(id: string){
        const found = await this.requestRepository.find({id});
        if(!found){
            throw new NotFoundException(`Request with the id ${id} not found`)
        }
        return this.requestRepository.delete(id);
    }

    /**
     * Get the request by the id
     * @param id of the request
     */
    async getRequest(id: string){
        const found = await this.requestRepository.find({id});
        if(!found){
            throw new NotFoundException(`Request with the id ${id} not found`)
        }
        return this.requestRepository.delete(id);
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
