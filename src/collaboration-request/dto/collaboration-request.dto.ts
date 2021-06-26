import { IsOptional, IsString } from "class-validator";

export class CollaborationRequestDTO{
 
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