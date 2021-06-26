import { BaseEntity, Entity, PrimaryColumn, Column } from "typeorm";
import { StatusType } from "src/data/statusType.enum";

@Entity()
export class CollaborationRequest extends BaseEntity{
    @PrimaryColumn()
    id: string;

    @Column()
    from: string;

    @Column()
    to: string;

    @Column()
    board: string;
    
    @Column()
    status: StatusType
}