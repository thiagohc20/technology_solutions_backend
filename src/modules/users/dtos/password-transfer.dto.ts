import { IsNumber, ValidateIf, Matches, IsString } from 'class-validator';

export class PasswordTransferDto {
	@IsNumber({}, { message: 'A senha de transferência tem que ser um número' })
	@ValidateIf((o) => typeof o.transfer_password === 'number')
	@Matches(/^\d{1,4}$/, { message: 'A senha de transferência tem que ter 4 dígitos' })
	password_transfer: number;
}

export class RecoveryPasswordTransferDto extends PasswordTransferDto {
	@IsString()
	token: string;
}
