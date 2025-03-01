import { Module } from '@nestjs/common';
import { ExcelController } from './excel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

/* service */
import { ExcelService } from './excel.service';
import { EmployeeEntity } from '../employees/entity/employee.entity';
/* entties */
import { ProfileEntity } from '../profiles/entity/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity, EmployeeEntity])],
  controllers: [ExcelController],
  providers: [ExcelService],
})
export class ExcelModule {}
