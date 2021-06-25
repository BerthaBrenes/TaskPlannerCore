import { IsString, Matches } from "class-validator";

export class AuthCredentialDTO{
    
    @IsString()
    @Matches(/^[A-Za-z0-9._%+-]+@xtec.ac.cr$/,
        {message: "This mail domain is not allowed"})
    email: string;

    @IsString()
    pwd: string;
}