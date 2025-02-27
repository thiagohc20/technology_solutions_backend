import { IsEmail, IsJWT, IsString } from 'class-validator';

export class AuthDto {
	@IsEmail()
	email: string;

	@IsString()
	password: string;
}

export class IdigitalAuthDto {
	@IsJWT()
	idToken: string;
}

export class AuthResponseDto {
	token: string;
	expiresIn: number;
}
