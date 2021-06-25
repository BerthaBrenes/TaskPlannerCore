import { IsString, IsNotEmpty } from "class-validator";

export class professorDTO{
    @IsString()
    @IsNotEmpty()
    Name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    
    @IsString()
    @IsNotEmpty()
    dni: string
   
    @IsString()
    @IsNotEmpty()
    career: string

    @IsString()
    @IsNotEmpty()
    province_residence: string

    @IsString()
    @IsNotEmpty()
    profile_photo: string;
}