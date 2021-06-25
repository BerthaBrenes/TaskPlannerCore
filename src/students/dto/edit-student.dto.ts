import { IsNotEmpty, IsOptional, IsString} from "class-validator";
import { Province } from "src/users/users.entity";

export class EditStudentDto {

    @IsNotEmpty()
    @IsString()
    name: string;

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