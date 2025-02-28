import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Email deve ser um texto' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  password: string;

  @IsNumber()
  role: number;
}
