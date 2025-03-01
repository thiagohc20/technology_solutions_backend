import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StatusEntity } from './entity/status.entity';
import { ProfileEntity } from '../profiles/entity/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatusEntity, ProfileEntity])],
  providers: [StatusService],
  controllers: [StatusController],
})
export class StatusModule {}
