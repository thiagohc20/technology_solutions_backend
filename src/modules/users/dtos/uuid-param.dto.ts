import { IsUUID } from 'class-validator';

export class UuidParamDto {
	@IsUUID('4', {
		message: 'O id deve ser do tipo uuid',
	})
	id: string;
}
