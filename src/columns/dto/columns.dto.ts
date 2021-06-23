import { IsNotEmpty, IsEnum, IsString } from "class-validator";

export class ColumnsDTO{
    @IsString()
    name: string;

    @IsNotEmpty()
    Tablero: any;
    
    @IsNotEmpty()
    Tareas: any;
}