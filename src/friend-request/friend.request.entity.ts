import { BaseEntity, Entity, Column, ObjectIdColumn } from "typeorm";
import { StatusType } from "src/data/statusType.enum";

@Entity()
export class FriendRequest extends BaseEntity{
    @ObjectIdColumn()
    id: string;

    @Column()
    from: string;
    
    @Column()
    to: string;
    
    @Column()
    status: StatusType;
}