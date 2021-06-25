import { IsNotEmpty, IsString, IsEnum } from "class-validator";
import { Province } from "src/data/province.enum";

export class professorDTO{
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    dni: string;
    
    @IsNotEmpty()
    @IsEnum(Province)
    provinceOfResidence: Province;
    
    @IsNotEmpty()
    @IsString()
    career: string;
    
    @IsString()
    @IsNotEmpty()
    avatarUrl: string;
    
    @IsNotEmpty()
    shareBoards: string[];
}