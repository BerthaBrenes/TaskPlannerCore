import { BaseEntity, Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class RequestI extends BaseEntity{
    @PrimaryColumn()
    id: string;

    @Column()
    fromUserId: string;

    @Column()
    toUserId: string;
    
    @Column()
    status: string;
}