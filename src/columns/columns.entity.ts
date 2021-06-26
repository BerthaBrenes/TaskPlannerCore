import { BaseEntity, Entity, PrimaryColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { TablerosI } from 'src/tableros/tableros.entity';
import { TareasI } from 'src/tareas/tareas.entity';

@Entity()
export class ColumnI extends BaseEntity{
    @PrimaryColumn()
    id: string

    @Column()
    name: string;

    @ManyToOne(()=> TablerosI, tablero => tablero.columns)
    Tablero: TablerosI;
    
    @OneToMany(() => TareasI, tareas => tareas.column )
    Tareas: TareasI;
}