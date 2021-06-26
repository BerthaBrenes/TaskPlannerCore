import { IsOptional, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { statusType } from "src/request/dto/statusType.enum";

export class collaborationRequestDTO{
 
    @IsOptional()
    @IsString()
    from: string;

    @IsOptional()
    @IsString()
    to: string;
    
    @IsOptional()
    @IsString()
    board: string;
}