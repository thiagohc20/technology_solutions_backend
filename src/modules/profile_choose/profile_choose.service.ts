import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProfileChooseEntity } from './entity/profile-choose.entity';
import { ProfileEntity } from '../profiles/entity/profile.entity';

@Injectable()
export class ProfileChooseService {
  constructor(
    @InjectRepository(ProfileChooseEntity)
    private profileChooseRepository: Repository<ProfileChooseEntity>,
  ) {}

  async canChangeProfile(user: ProfileEntity, id: number): Promise<boolean> {
    const profile = await this.profileChooseRepository.find({
      where: { profileId: user.id },
    });

    return profile.some((item) => item.profileChooseId == id);
  }
}
