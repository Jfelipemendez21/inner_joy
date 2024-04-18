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

            return { success: true, message: "Resultados guardados de forma satisfactoria", results: await this.findRetult(decoded['user'].id)};
            
        }catch(err){
            throw new ConflictException("Ha ocurrido un error " +err)
        }
    }

    async findRetult(idUsuarioAutenticado: number): Promise<any> {
        try{
            const test= await this.testRealizadosRepo.findOne({
                where:{
                    usuario_id: idUsuarioAutenticado
                },
                order: {
                    fecha_realizacion: "DESC"
                },
                relations: ['usuario_id','test_id']
            });
            if(!test){
                return {}
            }
            return {
                id_test: test.id,
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
                recommendation:  await test.test_id["tipo_test_id"] === 2 ? await this.obtenerMensajeTestAvanzados(test) : await this.obtenerMensajeTestPrincipales(test)
            }
        }catch(err){
            throw new ConflictException("Ha ocurrido un error " +err)
        }
    }

    async findAllRetults(token: string){
        try{
            const decoded = jwt.verify(token, jwtConstants.secret);
            if(!decoded){
                throw new UnauthorizedException("Ha ocurrido un error al intentar validar el token")
            }
            console.log("Id del usuario autenticado"+decoded['user'].id)
            const results = await this.testRealizadosRepo.query(`
            SELECT tr.*, t.nombre_test FROM inner_joy.test_realizados tr INNER JOIN inner_joy.test t ON tr.usuario_id = ${decoded['user'].id} AND tr.test_id = t.id;
            `)
            
            // find(

            //     {
            //         where:{
            //             usuario_id: decoded['user'].id
            //         },
            //         order: {
            //             fecha_realizacion: "DESC"
            //         },
            //         relations: ['test_id', 'usuario_id']
            //         }
            // )

            if(!results){
                throw new NotFoundException(`No se encontraron resultados con el usuario ${decoded['user'].username}`)
            }
            console.log('====================================');
            console.log(results);
            console.log('====================================');
            return Promise.all(results.map(async(test)=>{
                return {
                    ...test,
                    recommendation:  await test.tipo_test_id === 2 ? await this.obtenerMensajeTestAvanzados(test) : await this.obtenerMensajeTestPrincipales(test)
                    }
                
            }))
            
        }catch(err){
            throw new ConflictException("Ha ocurrido un error " +err)
        }
    }
    

    async obtenerMensajeTestAvanzados(test: Record<string, any>) {
        if (test.puntaje <= 3) {
            return {message: "Su salud mental se encuentra estable, no hay de que preocuparse", risk: 1};
        } else if (test.puntaje >= 4 && test.puntaje <= 7) {
            return {message: "Sus sintomas estan catalogados como normales, se encuentra sano", risk: 2};
        } else if (test.puntaje >= 8) {
            return {message: "Sus sintomas pueden estar relacionados al padecimiento del transtorno en cuestion, se recomienda comunicarse con un especialista lo antes posible", risk: 3};
        }
    }

    async obtenerMensajeTestPrincipales(test: Record<string, any>){
        if (test.puntaje >= 0 && test.puntaje <= 7) {
            return {message: "No se recomienda hacer el test completo ", risk: 1};
        } else if (test.puntaje >= 8) {
            return {message: `Se recomienda hacer el test completo de ${test.nombre_test}`, risk: 2};
        }
    }

}
