import { TestRealizadosEntity } from 'src/test_realizados/entitys/test_realizados.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({name: "usuario"}) // El nombre de la tabla puede ser especificado aquí
export class UsuarioEntity {
  @PrimaryGeneratedColumn() // Define la columna id como clave primaria autoincremental
  id: number;

  @Column({ type: 'varchar', length: 100 }) // Define la columna nombre
  nombre: string;

  @Column({ type: 'varchar', length: 50 }) // Define la columna user
  username: string;

  @Column({ type: 'varchar', length: 50 }) // Define la columna email
  email: string;

  @Column({ type: 'varchar', length: 500 }) // Define la columna password
  password: string;

  @Column({ type: 'tinyint', width: 4 }) // Define la columna activo
  activo: number;

  @OneToMany(()=>TestRealizadosEntity, (test_realizado)=>test_realizado.usuario_id)
  test_realizados: TestRealizadosEntity[];
}
