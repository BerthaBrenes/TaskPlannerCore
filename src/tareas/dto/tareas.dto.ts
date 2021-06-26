import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class tareasDTO{

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    priority: string;
    
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
    @IsString()
    dependency: string;

    @IsOptional()
    column: any;
}