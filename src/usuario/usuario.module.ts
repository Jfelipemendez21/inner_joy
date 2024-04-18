import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './entitys/usuario.entity';
import { jwtConstants } from './constants';


@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity]),
    JwtModule.register({
      secret: jwtConstants.secret, 
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports:[UsuarioService]
})
export class UsuarioModule {}
