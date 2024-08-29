import {  IsInt, IsPositive, IsString, Min, MinLength } from "class-validator"

export class CreatePokemonDto {

   @IsInt({message: "El id debe ser un entero"})
   @IsPositive({message: "El id debe ser positivo"}) 
   @Min(1)
       
   

    no: number;
    
    @IsString()
    @MinLength(1)
    name: string;


}
