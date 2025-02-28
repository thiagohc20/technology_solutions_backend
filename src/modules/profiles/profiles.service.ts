import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfilesDto } from './dtos/create-profile.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../users/users.entity';
import { Profile } from './entity/profile.entity';

/* paginacao */
import { PaginationDto } from '../users/dtos/pagination.dto';
import { PaginationResponseDto } from '../users/dtos/pagination-response.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}
  async paginate(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<Profile>> {
    const { page, limit } = paginationDto;
    const [data, total] = await this.profileRepository.findAndCount({
      skip: (page! - 1) * limit!,
      take: limit,
    });
    return {
      data,
      total,
      page,
      limit,
    };
  }
  async findAll(): Promise<Profile[]> {
    return await this.profileRepository.find();
  }
  // async create(profile: ProfilesDto): Promise<{ message: string }> {
  //   const timestamp = { created_at: new Date(), updated_at: new Date() };
  //   profile.id = uuidv4();
  //   const newProfile = this.profileRepository.create({
  //     ...profile,
  //     ...timestamp,
  //   });
  //   await this.profileRepository.save(newProfile);
  //   return { message: 'Perfil criado com sucesso!' };
  // }

  async updateProfilesToUser(
    userId: number,
    profileId: number,
  ): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const existingProfile = await this.profileRepository.findOne({
      where: { id: profileId },
    });

    if (!existingProfile) {
      throw new NotFoundException('Perfil não encontrado');
    }

    user.profile = existingProfile;
    await this.userRepository.save(user);

    return { message: 'Perfis atualizados com sucesso!' };
  }

  // async update(id: string, profile: ProfilesDto): Promise<{ message: string }> {
  //   const profileExists = await this.profileRepository.findOne({
  //     where: { id },
  //   });
  //   if (!profileExists) {
  //     throw new NotFoundException('Perfil não encontrado');
  //   }
  //   const uptadeAt = { updatedAt: new Date() };
  //   await this.profileRepository.update(id, { ...profile, ...uptadeAt });
  //   return { message: 'Perfil atualizado com sucesso!' };
  // }
}
