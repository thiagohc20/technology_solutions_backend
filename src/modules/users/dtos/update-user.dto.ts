import { IsNotEmpty, IsString, IsOptional, IsEmail, IsArray, ArrayNotEmpty } from 'class-validator';

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

	@IsArray({ message: 'Role deve ser um array' })
	@IsString({ each: true, message: 'Role deve ser um texto' })
	roles: string[];
}
