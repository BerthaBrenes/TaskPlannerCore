import { Repository, EntityRepository } from "typeorm";
import { RequestI } from "./request.entity";
import { requestDTO } from "./dto/request.dto";

@EntityRepository(RequestI)
export class RequestRepository extends Repository<RequestI>{

    async createReq(data: requestDTO){
        const {fromUserId, status, toUserId} = data;
        const request = new RequestI();
        request.fromUserId = fromUserId;
        request.toUserId = toUserId;
        request.status = toUserId;
        return await request.save();
    }
}