import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
/* entities */
import { ProfileEntity } from './entity/profile.entity';
import { UserEntity } from '../users/users.entity';
@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity, UserEntity])],
  providers: [ProfilesService],
  controllers: [ProfilesController],
  exports: [ProfilesService, TypeOrmModule],
})
export class ProfilesModule {}
