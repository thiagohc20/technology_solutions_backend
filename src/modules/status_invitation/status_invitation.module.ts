import { Module } from '@nestjs/common';
import { StatusInvitationService } from './status_invitation.service';
import { StatusInvitationController } from './status_invitation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StatusInvitationEntity } from './entity/status_invitation.entity';
import { ProfileEntity } from '../profiles/entity/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatusInvitationEntity, ProfileEntity])],
  providers: [StatusInvitationService],
  controllers: [StatusInvitationController],
})
export class StatusInvitationModule {}
