import { IsString } from "class-validator"

export class CrearUsuarioDto{
    @IsString()
    nombre: string

    @IsString()
    username: string 

    @IsString()
    email: string 

    @IsString()
    password: string
}