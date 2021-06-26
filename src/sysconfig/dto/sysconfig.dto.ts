import { IsString, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { tableroType } from "src/boards/dto/tableroType.enum";

export class SysConfigDTO{
  
    boardTypes: string[];


    lastModifiedBy: string;


    systemUses: string[];


    hobbies: string[];


    avatars: string[];
}