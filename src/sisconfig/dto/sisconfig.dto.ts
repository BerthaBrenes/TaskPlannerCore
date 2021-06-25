import { IsString, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { tableroType } from "src/tableros/dto/tableroType.enum";

export class sisconfigDTO{
    @IsString()
    @IsNotEmpty()
    idUser: string;

    @IsEnum(tableroType)
    @IsNotEmpty()
    tableroType: tableroType;

    @IsString()
    @IsNotEmpty()
    profilePhotos: string;

    @IsNotEmpty()
    applications: any[];

    @IsNotEmpty()
    hobbies: any[];
}