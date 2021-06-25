import { IsString, IsNotEmpty, IsEnum } from "class-validator";
import { userType } from "./userType.enum";
import { applications } from "./applications.enum";
import { hobbies } from "./hobbies.enum";

export class userDTO{
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
    license: string

    @IsString()
    @IsNotEmpty()
    career: string

    @IsString()
    @IsNotEmpty()
    province_residence: string

    @IsString()
    @IsNotEmpty()
    province_living: string;

    @IsString()
    @IsNotEmpty()
    profile_photo: string;

    @IsEnum(userType)
    @IsNotEmpty()
    type: userType;

    @IsNotEmpty()
    application: applications[];

    @IsNotEmpty()
    hobbies: hobbies[];

    @IsNotEmpty()
    Tableros_Owner: string[];

    @IsNotEmpty()
    Tableros_Friend: string[];

    @IsNotEmpty()
    Friends: string[];
}