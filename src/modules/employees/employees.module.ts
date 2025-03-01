import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
/* services */
import { EmployeesService } from './employees.service';
import { UserService } from '../users/users.service';
import { ProfilesService } from '../profiles/profiles.service';
import { ProfileChooseService } from '../profile_choose/profile_choose.service';
import { StatusInvitationService } from '../status_invitation/status_invitation.service';
/* entites */
import { UserEntity } from '../users/users.entity';
import { EmployeeEntity } from '../employees/entity/employee.entity';
import { ProfileEntity } from '../profiles/entity/profile.entity';
import { ProfileChooseEntity } from '../profile_choose/entity/profile-choose.entity';
import { StatusInvitationEntity } from './../status_invitation/entity/status_invitation.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmployeeEntity,
      UserEntity,
      ProfileEntity,
      ProfileChooseEntity,
      StatusInvitationEntity,
    ]),
  ],
  providers: [
    EmployeesService,
    UserService,
    ProfilesService,
    ProfileChooseService,
    StatusInvitationService,
  ],
  controllers: [EmployeesController],
})
export class EmployeesModule {}
