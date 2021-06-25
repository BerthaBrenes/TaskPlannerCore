import { BaseEntity, Entity, PrimaryColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Board } from '../boards/boards.entity';
import { TareasI } from '../tareas/tareas.entity';

@Entity()
export class ColumnI extends BaseEntity{
    @PrimaryColumn()
    id: string

    @Column()
    name: string;

    Tablero: Board;
    
    Tareas: TareasI;
}