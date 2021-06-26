import { IsOptional, IsEnum, IsNotEmpty } from "class-validator";
import { statusType } from "src/request/dto/statusType.enum";


export class requestDTO{
 
    @IsOptional()
    from: any;

    @IsOptional()
    to: any;
    
    @IsEnum(statusType)
    @IsNotEmpty()
    status: statusType;
}