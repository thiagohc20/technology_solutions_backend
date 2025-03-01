import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  MaxLength,
  Length,
} from 'class-validator';

export class CreateStatusInvitationDto {
  @IsString({ message: 'ID deve ser uma number' })
  @IsOptional()
  statusId: number;

  @IsString({ message: 'Email deve ser um texto' })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;
}
