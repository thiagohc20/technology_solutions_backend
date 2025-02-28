import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  MaxLength,
  Length,
} from 'class-validator';

export class CreateEmployeeDto {
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
  @Length(2, 2, { message: 'UF deve ter exatamente 2 caracteres' })
  uf: string;

  @IsString({ message: 'Bairro deve ser um texto' })
  @IsNotEmpty({ message: 'Bairro é obrigatório' })
  @MaxLength(40, { message: 'Bairro não pode ter mais de 40 caracteres' })
  neighborhood: string;

  @IsString({ message: 'Localidade deve ser um texto' })
  @IsNotEmpty({ message: 'Localidade é obrigatório' })
  @MaxLength(30, { message: 'Localidade não pode ter mais de 30 caracteres' })
  locality: string;

  @IsString({ message: 'Logradouro deve ser um texto' })
  @IsNotEmpty({ message: 'Logradouro é obrigatório' })
  @MaxLength(100, { message: 'Localidade não pode ter mais de 100 caracteres' })
  publicPlace: string;

  @IsString({ message: 'Email deve ser um texto' })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsString({ message: 'CEP deve ser um texto' })
  @IsNotEmpty({ message: 'CEP é obrigatório' })
  @Length(8, 8, { message: 'CEP deve ter exatamente 8 caracteres' })
  zipcode: string;

  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @Length(11, 11, { message: 'CPF deve ter exatamente 11 caracteres' })
  cpf: string;
}
