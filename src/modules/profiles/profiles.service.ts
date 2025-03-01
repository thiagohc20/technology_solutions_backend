import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfilesDto } from './dtos/create-profile.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from '../users/users.entity';
import { ProfileEntity } from './entity/profile.entity';

/* paginacao */
import { PaginationDto } from '../users/dtos/pagination.dto';
import { PaginationResponseDto } from '../users/dtos/pagination-response.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  async findAll(): Promise<ProfileEntity[]> {
    return await this.profileRepository.find();
  }
}
