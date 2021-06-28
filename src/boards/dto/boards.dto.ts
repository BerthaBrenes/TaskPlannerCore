import { IsString, IsNotEmpty} from "class-validator";

export class BoardDTO{
    @IsString()
    name: string;

    @IsNotEmpty()
    owner: any;

    @IsString()
    type: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    columns: any;
}