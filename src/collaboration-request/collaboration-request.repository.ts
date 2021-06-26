import { MongoRepository, EntityRepository } from "typeorm";
import { CollaborationRequest } from "./collaboration-request.entity";
import { collaborationRequestDTO } from "./dto/collaboration-request.dto";
import { statusType } from "src/request/dto/statusType.enum";

@EntityRepository(CollaborationRequest)
export class CollaborationRequestRepository extends MongoRepository<CollaborationRequest>{
    async createReq(data: collaborationRequestDTO){
        const {from, to, board} = data;
        const request = new CollaborationRequest();
        request.from = from;
        request.to = to;
        request.status = statusType.PENDING;
        request.board = board;
        return await request.save();
    }
}