import { MongoRepository, EntityRepository } from "typeorm";
import { FriendRequest } from "./friend.request.entity";
import { RequestDTO } from "./dto/friend-request.dto";
import { StatusType } from "src/data/statusType.enum";

@EntityRepository(FriendRequest)
export class FriendRequestRepository extends MongoRepository<FriendRequest>{
    
    async createRequest(data: RequestDTO){
        const {from, to} = data;
        const request = new FriendRequest();
        request.from = from;
        request.to = to;
        request.status = StatusType.PENDING;
        return request.save();
    }
}