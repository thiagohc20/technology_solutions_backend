import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
/* services */
import { EmployeesService } from './employees.service';
import { UserService } from '../users/users.service';
import { ProfilesService } from '../profiles/profiles.service';
/* entites */
import { UserEntity } from '../users/users.entity';
import { EmployeeEntity } from '../employees/entity/employee.entity';
import { ProfileEntity } from '../profiles/entity/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeEntity, UserEntity, ProfileEntity]),
  ],
  providers: [EmployeesService, UserService, ProfilesService],
  controllers: [EmployeesController],
})
export class EmployeesModule {}
