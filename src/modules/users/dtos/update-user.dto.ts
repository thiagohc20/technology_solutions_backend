import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  MaxLength,
  Length,
  IsNumber,
  Matches,
} from 'class-validator';

export class UpdateUserDto {
  @IsNumber({}, { message: 'O id deve ser um número' })
  employeeId: number;

  @IsNumber({}, { message: 'O id deve ser um número' })
  profileId: number;

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
