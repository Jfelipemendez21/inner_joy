import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestModule } from 'src/test/test.module';
import { TestRealizadosEntity } from './entitys/test_realizados.entity';
import { TestRealizadosController } from './test_realizados.controller';
import { TestRealizadosService } from './test_realizados.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestRealizadosEntity]),
    forwardRef(()=> TestModule), // Importa el módulo de Facturas
  ],
  controllers: [TestRealizadosController],
  providers: [TestRealizadosService],
  exports:[TestRealizadosService]
  
})
export class TestRealizadosModule {}
