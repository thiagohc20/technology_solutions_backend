import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { Roles } from '../auth/roles.decorator';
import { ProfileEntity } from './entity/profile.entity';
import { ProfilesDto } from './dtos/create-profile.dto';
import { AuthGuard } from '../auth/auth.guard';
@Controller('profiles')
@UseGuards(AuthGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  async findAll(): Promise<ProfileEntity[]> {
    return this.profilesService.findAll();
  }
}
