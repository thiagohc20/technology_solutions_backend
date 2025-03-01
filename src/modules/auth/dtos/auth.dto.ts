import { IsJWT, IsString, IsNotEmpty, Matches } from 'class-validator';

export class AuthDto {
  @IsString({ message: 'Nome deve ser um texto' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  cpf: string;

  @IsString({ message: 'A senha deve ser uma string válida' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'A senha deve ter no mínimo 8 caracteres, contendo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
    },
  )
  password: string;
}

export class AuthResponseDto {
  token: string;
  expiresIn: number;
}
