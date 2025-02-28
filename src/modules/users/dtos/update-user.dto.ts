import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  IsArray,
  ArrayNotEmpty,
  Validate,
  IsNumber,
} from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Nome deve ser um texto' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Senha deve ser um texto' })
  cpf: string;

  @IsString({ message: 'Email deve ser um texto' })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsString({ message: 'Email deve ser um texto' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  password: string;

  @IsNumber()
  role: number;
}
