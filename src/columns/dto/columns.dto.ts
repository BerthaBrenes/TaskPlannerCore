import { IsNotEmpty, IsString } from "class-validator";

export class ColumnsDTO{
    @IsString()
    name: string;

    @IsNotEmpty()
    board: any;
}