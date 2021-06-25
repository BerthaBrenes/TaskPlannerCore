import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { tableroType } from "./tableroType.enum";

export class BoardDTO{
    @IsString()
    name: string;

    @IsNotEmpty()
    owner: any;
    
    @IsOptional()
    friends: any;

    @IsString()
    type: tableroType;

    @IsString()
    description: string;

    @IsNotEmpty()
    columns: any;
}