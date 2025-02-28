import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class UserDto {
  @IsString({ message: 'ID deve ser uma string' })
  @IsOptional()
  id?: number;

  @IsString({ message: 'Nome deve ser um texto' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsString({ message: 'Telefone deve ser um texto' })
  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  telephone: string;

  @IsString({ message: 'UF deve ser um texto' })
  @IsNotEmpty({ message: 'UF é obrigatório' })
  uf: string;

  @IsString({ message: 'Bairro deve ser um texto' })
  @IsNotEmpty({ message: 'Bairro é obrigatório' })
  neighborhood: string;

  @IsString({ message: 'Localidade deve ser um texto' })
  @IsNotEmpty({ message: 'Localidade é obrigatório' })
  locality: string;

  @IsString({ message: 'Logradouro deve ser um texto' })
  @IsNotEmpty({ message: 'Logradouro é obrigatório' })
  publicPlace: string;

  @IsString({ message: 'Email deve ser um texto' })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsString({ message: 'CEP deve ser um texto' })
  @IsNotEmpty({ message: 'CEP é obrigatório' })
  zipcode: string;

  @IsNotEmpty({ message: 'CPF é obrigatório' })
  cpf: string;

  @IsString({ message: 'Senha deve ser um texto' })
  @IsOptional()
  password?: string;
}
