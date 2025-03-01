import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

//Modules
import { AuthModule } from 'src/modules/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { ProfilesModule } from './../modules/profiles/profiles.module';
import { UserModule } from './../modules/users/users.module';
import { EmployeesModule } from 'src/modules/employees/employees.module';
import { ExcelModule } from 'src/modules/excel/excel.module';
import { MailModule } from 'src/modules/mail/mail.module';
import { StatusModule } from 'src/modules/status/status.module';
import { StatusInvitationModule } from 'src/modules/status_invitation/status_invitation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DatabaseModule,
    ExcelModule,
    UserModule,
    ProfilesModule,
    StatusModule,
    MailModule,
    EmployeesModule,
    StatusInvitationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
