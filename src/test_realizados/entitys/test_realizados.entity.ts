import { TestEntity } from 'src/test/entitys/test.entity';
import { UsuarioEntity } from 'src/usuario/entitys/usuario.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({name: "test_realizados"}) 
export class TestRealizadosEntity {
  @PrimaryGeneratedColumn() 
  id: number;


  @ManyToOne(()=>TestEntity)
  @JoinColumn({name: "test_id"})
  test_id: number;

  @ManyToOne(()=>UsuarioEntity)
  @JoinColumn({name: "usuario_id"})
  usuario_id: number;

  @Column({ type: 'int' }) 
  puntaje: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  fecha_realizacion: Date;
}
