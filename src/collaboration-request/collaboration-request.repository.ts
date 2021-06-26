import { MongoRepository, EntityRepository } from "typeorm";
import { CollaborationRequest } from "./collaboration-request.entity";
import { CollaborationRequestDTO } from "./dto/collaboration-request.dto";
import { StatusType } from "src/data/statusType.enum";

@EntityRepository(CollaborationRequest)
export class CollaborationRequestRepository extends MongoRepository<CollaborationRequest>{
    async createReq(data: CollaborationRequestDTO){
        const {from, to, board} = data;
        const request = new CollaborationRequest();
        request.from = from;
        request.to = to;
        request.status = StatusType.PENDING;
        request.board = board;
        return await request.save();
    }
}