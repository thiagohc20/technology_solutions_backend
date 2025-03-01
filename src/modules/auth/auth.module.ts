import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthServiceTsController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmployeeEntity } from '../employees/entity/employee.entity';
import { UserModule } from 'src/modules/users/users.module';
import { ProfileEntity } from 'src/modules/profiles/entity/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from '../employees/employees.service';
@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([ProfileEntity, EmployeeEntity]),
    UserModule,
  ],
  providers: [AuthService, EmployeesService],
  controllers: [AuthServiceTsController],
})
export class AuthModule {}
