import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './users.controller';
/* services */
import { UserService } from './users.service';

import { ProfilesService } from '../profiles/profiles.service';

/* entities */
import { User } from './users.entity';

import { Profile } from '../profiles/entity/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  providers: [UserService, ProfilesService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
