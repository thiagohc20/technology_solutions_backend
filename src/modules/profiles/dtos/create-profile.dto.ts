import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class ProfilesDto {
	@IsOptional()
	@IsString({ message: 'ID deve ser uma string' })
	id: string;

	@IsString({ message: 'Nome deve ser uma string' })
	@IsNotEmpty({ message: 'Nome é obrigatório' })
	name: string;
}
