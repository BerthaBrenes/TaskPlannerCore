import { Repository, EntityRepository } from "typeorm";
import { RequestI } from "./request.entity";

@EntityRepository(RequestI)
export class RequestRepository extends Repository<RequestI>{

}