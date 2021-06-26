import { BaseEntity, Entity, Column, ObjectIdColumn } from "typeorm";
import { statusType } from "src/request/dto/statusType.enum";
@Entity()
export class FriendRequest extends BaseEntity{
    @ObjectIdColumn()
    id: string;

    @Column()
    from: string;
    
    @Column()
    to: string;
    
    @Column()
    status: statusType;
}