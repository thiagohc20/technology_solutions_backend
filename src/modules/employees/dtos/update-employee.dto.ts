import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  telephone?: string;

  @IsString()
  @IsOptional()
  uf?: string;

  @IsString()
  @IsOptional()
  neighborhood?: string;

  @IsString()
  @IsOptional()
  locality?: string;

  @IsString()
  @IsOptional()
  publicPlace?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  zipcode?: string;

  @IsString()
  @IsOptional()
  cpf?: string;
}
