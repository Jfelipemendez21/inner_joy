import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CrearUsuarioDto } from './dtos/crear_usuario.dto';
import { UsuarioEntity } from './entitys/usuario.entity';
import * as bcrypt from 'bcrypt'; 
import { LoginDto } from './dtos/login.dto';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './constants';


@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity) private readonly usuarioRepo: Repository<UsuarioEntity>,
        private jwtService: JwtService
        ){}

    async tokenGenerate(user: any) {
        const payload = {user};
        return this.jwtService.sign(payload)
     }

    async register(crearUsuarioDto: CrearUsuarioDto){
        try{
            const {email, nombre, password, username} = crearUsuarioDto
            if(!email || !nombre || !password || !username){
                throw new BadRequestException("No es posible crear el usuario, hay campos vacios!")
            }

            const usuarioExistente= await this.getUser(username)
            if(usuarioExistente){
                throw new ConflictException("El usuario ya existe")
            }
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            console.log(hashedPassword)

            const usuario = await this.usuarioRepo.save({...crearUsuarioDto, password: hashedPassword});

            if(!usuario){
                throw new BadRequestException("No fue posible guardar el usuario")
            }

            return usuario
        }catch(err){
            throw new ConflictException("Error al intentar crear el usuario" +err)
        }
    }

    async login({username, password}: LoginDto): Promise<any> {
        try{
            if(!username || !password){
                throw new BadRequestException("No es posible iniciar sesion, hay campos vacios!")
            }
            const user = await this.getUser(username);
            if (!user) {
                throw new UnauthorizedException("Credenciales no validas");
            }
            console.log(user)
            const contraseñaCorrecta= await bcrypt.compare(password, user.password)
            console.log(contraseñaCorrecta)

            if (contraseñaCorrecta==false){
                throw new UnauthorizedException("Credenciales no validas");
            }
            return user;
        }catch(err){
            throw new ConflictException("Error al intentar iniciar sesion " +err)
        }
     }

     async getUser(username: string ){
        try{
            const user= await this.usuarioRepo.findOne({
                where:{username}
            })
            if(!user){
                return null
            }

            return user
        }catch(err){
            throw new ConflictException("Error al intentar obtener el usuario " ,err)
        }

     }

     async refreshToken(token: string): Promise<string> {
        try {
          const decoded: any = jwt.verify(token, jwtConstants.secret);
          console.log("codificadooo",decoded);
          if (!decoded) {
            throw new Error('Token no encontrado');
          }
    
          const exp = decoded.exp;
          const currentTimestamp = Math.floor(Date.now() / 1000);
    
          if (currentTimestamp >= exp) {
            throw new Error('El token ha expirado');
          }
    
          const newExp = currentTimestamp + 3600 ;
          console.log(newExp)
          const newToken = jwt.sign({ ...decoded, exp: newExp }, jwtConstants.secret);
          console.log("Nuevo token generooo",newToken);
    
          return newToken;
        } catch (error) {
          throw new Error("Token invalido " + error);
        }
     }
}
