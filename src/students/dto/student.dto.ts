import { IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";
import { Province } from "src/users/users.entity";

export class StudentDto {

    @IsString()
    userId: string

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Za-z0-9._%+-]+@xtec.ac.cr$/,
        {message: "This mail domain is not allowed"})
    email: string;
    
    @IsNotEmpty()
    @IsString()
    dni: string;

    @IsNotEmpty()
    @IsString()
    studentCard: string;

    @IsNotEmpty()
    @IsString()
    career: string;

    @IsNotEmpty()
    provinceOfProvenance: Province;
    
    @IsNotEmpty()
    provinceOfResidence: Province;
    
    @IsNotEmpty()
    @IsString()
    avatarUrl: string;
    
    @IsOptional()
    @IsString()
    phone?: string;
}