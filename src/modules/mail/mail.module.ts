import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileEntity } from '../profiles/entity/profile.entity';
import { EmployeeEntity } from '../employees/entity/employee.entity';
import { StatusInvitationEntity } from '../status_invitation/entity/status_invitation.entity';

import { StatusInvitationService } from '../status_invitation/status_invitation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfileEntity,
      EmployeeEntity,
      StatusInvitationEntity,
    ]),
  ],
  providers: [MailService, StatusInvitationService],
  controllers: [MailController],
})
export class MailModule {}
