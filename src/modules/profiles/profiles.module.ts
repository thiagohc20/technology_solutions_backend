import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
/* entities */
import { Profile } from './entity/profile.entity';
import { User } from '../users/users.entity';
@Module({
	imports: [TypeOrmModule.forFeature([Profile, User])],
	providers: [ProfilesService],
	controllers: [ProfilesController],
	exports: [ProfilesService, TypeOrmModule],
})
export class ProfilesModule {}
