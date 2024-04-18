import { BadRequestException, ConflictException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrearTestDto } from './dtos/crear_test.dto';
import { TestRealizadosEntity } from './entitys/test_realizados.entity';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/usuario/constants';
import { TestService } from 'src/test/test.service';

@Injectable()
export class TestRealizadosService {
    constructor(
        @InjectRepository(TestRealizadosEntity) private readonly testRealizadosRepo: Repository<TestRealizadosEntity>,
        @Inject(forwardRef(()=> TestService))private readonly testService: TestService,
    ){}

    async findRetults(token: string): Promise<any> {
        try{
            const decoded = jwt.verify(token, jwtConstants.secret);
            if(!decoded){
                throw new UnauthorizedException("Ha ocurrido un error al intentar validar el token")
            }
            console.log(decoded)
            const test= await this.testRealizadosRepo.findOne({
                where:{
                    usuario_id: decoded['user'].id
                },
                order: {
                    fecha_realizacion: "DESC"
                },
                relations: ['usuario_id','test_id']
            });
            console.log(test)
            return {
                id: test.id,
                puntaje: test.puntaje,
                fecha_realizacion: test.fecha_realizacion,
                usuario: 
                    {
                        id: test.usuario_id['id'], 
                        nombre: test.usuario_id['nombre'], 
                        username: test.usuario_id['username'], 
                        email:test.usuario_id['email']
                    },
                test: test.test_id,
                message:  await test.test_id["tipo_test_id"] === 1 ? await this.obtenerMensaje(test) : `Gracias por completar el test de ${test.test_id['nombre_test']}, le recomendamos buscar ayuda profesional`
            }
        }catch(err){
            throw new ConflictException("Ha ocurrido un error " +err)
        }
    }

    async obtenerMensaje(test: Record<string, any>) {
        if (test.puntaje <= 3) {
            return {message: "Su salud mental se encuentra estable, no hay de que preocuparse", risk: 1};
        } else if (test.puntaje >= 4 && test.puntaje <= 7) {
            return {message: "Sus sintomas estan catalogados como normales, no se recomienda hacer el test avanzado", risk: 2};
        } else if (test.puntaje >= 8 && test.puntaje <= 11) {
            return {message: "Su sintomas pueden estar relacionados al padecimiento del transtorno, se recomienda hacer el test", risk: 3};
        } else if (test.puntaje >= 12) {
            return {message: "Se recomienda comunicarse con un especialista de forma inmediata", risk: 4};
        }
    }

    async createResult(token: string, test: CrearTestDto): Promise<{}> {
        try{
            const {puntaje, test_id} = test; 
            if(!puntaje || !test_id){
                throw new BadRequestException("Campos vacios") 
            }

            const decoded = jwt.verify(token, jwtConstants.secret);
            if(!decoded){
                throw new UnauthorizedException("Ha ocurrido un error al intentar validar el token")
            }

            await this.testService.findTestById(test_id)
            
            const newTest = await this.testRealizadosRepo.save({...test, usuario_id: decoded['user'].id});
            if(!newTest){
                throw new BadRequestException("No fue posible guardar el test")
            }

            return { success: true, message: "Resultados guardados de forma satisfactoria"};
        }catch(err){
            throw new ConflictException("Ha ocurrido un error " +err)
        }
    }
}
