import { IsNotEmpty, IsOptional, IsString} from "class-validator";
import { Province } from "src/data/province.enum";

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