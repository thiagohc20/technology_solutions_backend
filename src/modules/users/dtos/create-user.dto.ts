import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  MaxLength,
  Length,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsNumber({}, { message: 'O id deve ser um número' })
  userId: number;

  @IsNumber({}, { message: 'O id deve ser um número' })
  profileId: number;
}
