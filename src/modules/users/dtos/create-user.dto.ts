import { IsNotEmpty, IsString, IsOptional, IsEmail, IsArray, ArrayNotEmpty } from 'class-validator';

export class UserDto {
	@IsString({ message: 'ID deve ser uma string' })
	@IsOptional()
	id?: string;

	@IsString({ message: 'Nome deve ser um texto' })
	@IsNotEmpty({ message: 'Nome é obrigatório' })
	name: string;

	@IsString({ message: 'Email deve ser um texto' })
	@IsEmail({}, { message: 'Email inválido' })
	@IsNotEmpty({ message: 'Email é obrigatório' })
	email: string;

	@IsNotEmpty({ message: 'CPF é obrigatório' })
	cpf: string;

	@IsString({ message: 'Senha deve ser um texto' })
	@IsOptional()
	password?: string;

	@IsArray({ message: 'Role deve ser um array' })
	@IsString({ each: true, message: 'Role deve ser um texto' })
	@ArrayNotEmpty({ message: 'Pelo menos um role é obrigatório' })
	profiles: string[];
}
