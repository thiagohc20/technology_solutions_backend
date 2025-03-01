import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  MaxLength,
  Length,
  IsNumber,
} from 'class-validator';

export class SendEmailDto {
  @IsString({ message: 'O email deve ser uma string' })
  @IsEmail({}, { message: 'O email deve ser valido' })
  email: string;
}
