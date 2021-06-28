import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { PriorityType } from "./priorityType.enum";

export class TareasDTO{

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    priority: PriorityType;
    
    @IsNotEmpty()
    @IsString()
    startDate: string;

    @IsNotEmpty()
    @IsString()
    endDate: string;

    @IsNotEmpty()
    @IsString()
    owner: string;

    @IsNotEmpty()
    dependency: string[];

    @IsOptional()
    column: any;
}