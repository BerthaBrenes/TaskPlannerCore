import { MongoRepository, BaseEntity, EntityRepository } from "typeorm";
import { FriendRequest } from "./friend.request.entity";
import { requestDTO } from "./dto/friend-request.dto";

@EntityRepository(FriendRequest)
export class FriendRequestRepository extends MongoRepository<FriendRequest>{
    async createReq(data: requestDTO){
        const {from, status, to} = data;
        const request = new FriendRequest();
        request.from = from;
        request.to = to;
        request.status = status;
        return await request.save();
    }
}