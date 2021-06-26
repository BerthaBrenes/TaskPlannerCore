import { IsNotEmpty, IsString } from "class-validator";

export class adminDTO{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;
}