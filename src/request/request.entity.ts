import { BaseEntity, Entity, PrimaryColumn, Column, ObjectIdColumn } from "typeorm";
import { statusType } from "./dto/statusType.enum";

@Entity()
export class RequestI extends BaseEntity{
    @ObjectIdColumn()
    id: string;

    @Column()
    fromUserId: string;

    @Column()
    toUserId: string;
    
    @Column()
    status: statusType;
}