import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './users.controller';
/* services */
import { UserService } from './users.service';
import { ProfilesService } from '../profiles/profiles.service';
import { EmployeesService } from '../employees/employees.service';
import { ProfileChooseService } from '../profile_choose/profile_choose.service';
import { JwtService } from '@nestjs/jwt';

/* entities */
import { UserEntity } from './users.entity';
import { EmployeeEntity } from '../employees/entity/employee.entity';
import { ProfileEntity } from '../profiles/entity/profile.entity';
import { ProfileChooseEntity } from '../profile_choose/entity/profile-choose.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ProfileEntity,
      EmployeeEntity,
      ProfileChooseEntity,
    ]),
  ],
  providers: [
    UserService,
    ProfilesService,
    EmployeesService,
    ProfileChooseService,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
