import { BaseEntity, Entity, PrimaryColumn, Column } from "typeorm";
import { statusType } from "./dto/statusType.enum";

@Entity()
export class RequestI extends BaseEntity{
    @PrimaryColumn()
    id: string;

    @Column()
    fromUserId: string;

    @Column()
    toUserId: string;
    
    @Column()
    status: statusType;
}