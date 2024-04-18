import { IsNumber, IsString } from 'class-validator';

export class CrearTestDto{
    @IsNumber()
    test_id: number;
  
    @IsNumber()
    puntaje: number;
}