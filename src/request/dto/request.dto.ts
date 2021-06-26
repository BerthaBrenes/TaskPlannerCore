import { IsOptional, IsEnum, IsNotEmpty } from "class-validator";
import { statusType } from "./statusType.enum";

export class requestDTO{
 
    @IsOptional()
    fromUserId: any;

    @IsOptional()
    toUserId: any;
    
    @IsEnum(statusType)
    @IsNotEmpty()
    status: statusType;
}