import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestEntity } from './entitys/test.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestService {
    constructor(
        @InjectRepository(TestEntity) private readonly testRepo: Repository<TestEntity>
    ){}
    async findTestById(id: number){
        try{
            const test = await this.testRepo.findOne({
                where: {
                    id
                }
            })
            if(!test){
                throw new NotFoundException("No se encontro el test con el id solicitado")
            }
            return test
        }catch(err){
            throw err
        }
    }
}
