import { BaseEntity, Entity, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class Admin extends BaseEntity{
    @ObjectIdColumn()
    id: string;

    @Column()
    name: string;
    
    @Column()
    email: string;
    
    @Column()
    userId: string;
}