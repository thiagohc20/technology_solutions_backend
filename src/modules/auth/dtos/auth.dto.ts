import { IsJWT, IsString, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsString({ message: 'Nome deve ser um texto' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  cpf: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  password: string;
}

export class AuthResponseDto {
  token: string;
  expiresIn: number;
}
