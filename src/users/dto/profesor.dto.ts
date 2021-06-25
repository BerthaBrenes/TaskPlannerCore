import { IsString, IsNotEmpty } from "class-validator";

export class professorDTO{
    @IsString()
    @IsNotEmpty()
    Name_1: string;

    @IsString()
    @IsNotEmpty()
    Name_2: string;
  
    @IsString()
    @IsNotEmpty()
    Lastname_1: string;

    @IsString()
    @IsNotEmpty()
    Lastname_2: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string
    
    @IsString()
    @IsNotEmpty()
    dmi: string
   
    @IsString()
    @IsNotEmpty()
    career: string

    @IsString()
    @IsNotEmpty()
    province_residence: string

    @IsString()
    @IsNotEmpty()
    canton: string;

    @IsString()
    @IsNotEmpty()
    district: string;

    @IsString()
    @IsNotEmpty()
    profile_photo: string;
}