import { BaseEntity, Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class ColumnI extends BaseEntity{
    @PrimaryColumn()
    id: string
    @Column()
    name: string;
    @Column()
    Tablero: string;
    @Column()
    Tareas: string;
}