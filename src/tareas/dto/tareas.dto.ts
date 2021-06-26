import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { priorityType } from "./priorityType.enum";

export class tareasDTO{

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    priority: priorityType;
    
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