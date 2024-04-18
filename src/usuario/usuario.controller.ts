import { Body, Controller, Get, Post, UnauthorizedException, Headers } from '@nestjs/common';
import { CrearUsuarioDto } from './dtos/crear_usuario.dto';
import { LoginDto } from './dtos/login.dto';
import { UsuarioService } from './usuario.service';

@Controller('auth')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
       const user = await this.usuarioService.login(loginDto);
       return {user, token: await this.usuarioService.tokenGenerate(user)}
    }

    @Post('register')
    async register(@Body() crearUsuarioDto: CrearUsuarioDto) {
        const user = await this.usuarioService.register(crearUsuarioDto);
        return {
            message: "Usuario creado de forma satisfactoria",
            user
        }
    }

    @Get('/regenerar-token')
    async refreshToken(@Headers("Authorization") authorization: string) {
        if(!authorization){
            throw new UnauthorizedException("No se ha enviado el token de autorización")
        }
        const token = authorization.split(' ')[1];
        console.log(token);
       if (!token) {
         throw new UnauthorizedException('Token de acceso no proporcionado');
       }
       try {
         const newToken = await this.usuarioService.refreshToken(token);
         return {
          message: 'Token refrescado exitosamente',
          nuevoToken: newToken
        };
       } catch (error) {
         throw new UnauthorizedException(error.message);
       }
    }
}
