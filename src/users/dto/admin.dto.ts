import { IsString, IsNotEmpty } from "class-validator";

export class adminDTO{
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string
}