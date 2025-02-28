import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  MaxLength,
  Length,
  IsNumber,
} from 'class-validator';

export class UpdateUserDto {
  @IsNumber({}, { message: 'O id deve ser um número' })
  userId: number;

  @IsNumber({}, { message: 'O id deve ser um número' })
  profileId: number;

  @IsString({ message: 'ID deve ser uma string' })
  @IsOptional()
  password?: string;

  @IsNumber({}, { message: 'O perfil deve ser um número' })
  @IsNotEmpty({ message: 'O perfil é obrigatório' })
  role: number;
}
