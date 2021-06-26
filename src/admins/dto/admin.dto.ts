import { IsNotEmpty, IsString } from "class-validator";

export class AdminDTO{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;
}