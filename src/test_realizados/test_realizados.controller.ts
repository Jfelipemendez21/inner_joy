import { Controller, Get, Post, Headers, UnauthorizedException, Body } from '@nestjs/common';
import { CrearTestDto } from './dtos/crear_test.dto';
import { TestRealizadosService } from './test_realizados.service';

@Controller('test-realizados')
export class TestRealizadosController {
    constructor(
        private readonly testRealizadosService: TestRealizadosService
    ){}

    @Get()
    async getAllResultsTests(@Headers("Authorization") authorization: string){
        if(!authorization){
            throw new UnauthorizedException("No se ha enviado el token de autorización")
        }
        const token= authorization.split(" ")[1]
        const results= await this.testRealizadosService.findAllRetults(token)
        return results
    }
    

    @Post()
    async createResultTest(@Headers("Authorization") authorization: string, @Body() crearTestDto: CrearTestDto){
            if(!authorization){
                throw new UnauthorizedException("No se ha enviado el token de autorización")
            }
            const token= authorization.split(" ")[1]
            const result= await this.testRealizadosService.createResult(token, crearTestDto)
            return result 
    }

}
