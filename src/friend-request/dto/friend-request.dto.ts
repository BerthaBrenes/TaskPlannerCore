import { IsOptional} from "class-validator";

export class RequestDTO{
 
    @IsOptional()
    from: any;

    @IsOptional()
    to: any;
}