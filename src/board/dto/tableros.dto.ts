import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class TableroDTO{
    @IsString()
    name: string;

    @IsNotEmpty()
    owner: any;
    
    @IsOptional()
    friends: any;

    @IsString()
    type: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    columns: any;
}