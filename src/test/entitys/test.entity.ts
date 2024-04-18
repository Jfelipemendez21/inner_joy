import { TestRealizadosEntity } from 'src/test_realizados/entitys/test_realizados.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('test') 
export class TestEntity {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column({ type: 'int' }) 
  tipo_test_id: number;

  @Column({ type: 'varchar', length: 50 }) 
  nombre_test: string;

  @OneToMany(()=>TestRealizadosEntity, (test_realizado)=>test_realizado.test_id)
  test_realizados: TestRealizadosEntity[];
}
