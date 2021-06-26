import { BaseEntity, Entity, Column, ObjectIdColumn } from 'typeorm';
@Entity()
export class ColumnI extends BaseEntity{
    @ObjectIdColumn()
    id: string

    @Column()
    name: string;
    @Column()
    board: string;
    @Column()
    tasks: string[];
}