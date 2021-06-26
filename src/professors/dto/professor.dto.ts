import { IsNotEmpty, IsString, IsEnum, IsOptional } from "class-validator";
import { Province } from "src/data/province.enum";

export class ProfessorDTO {
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
    
    @IsOptional()
    sharedBoards: string[];
}