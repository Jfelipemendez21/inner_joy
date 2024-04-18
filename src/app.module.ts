import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TestRealizadosModule } from './test_realizados/test_realizados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestEntity } from './test/entitys/test.entity';
import { TestRealizadosEntity } from './test_realizados/entitys/test_realizados.entity';
import { UsuarioEntity } from './usuario/entitys/usuario.entity';

@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'inner_joy',
        entities: [TestEntity, TestRealizadosEntity, UsuarioEntity], // Añade tus entidades aquí
        synchronize: true, // Cambia esto a false en producción
      }),
    TestModule, 
    UsuarioModule, 
    TestRealizadosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
