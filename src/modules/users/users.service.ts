import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError, In } from 'typeorm';
import { UserDto } from './dtos/create-user.dto';
import { PasswordTransferDto } from './dtos/password-transfer.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { instanceToPlain } from 'class-transformer';
/* interface */
import type { UserById } from './interfaces/User';
/* paginacao */
import { PaginationDto } from './dtos/pagination.dto';
import { PaginationResponseDto } from './dtos/pagination-response.dto';
/* entities */
import { User } from './users.entity';
import { Profile } from '../profiles/entity/profile.entity';
/* services */
import { ProfilesService } from '../profiles/profiles.service';

@Injectable()
export class UserService {
  constructor(
    private readonly profilesService: ProfilesService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async paginate(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<User>> {
    const { page, limit } = paginationDto;

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    queryBuilder.select([
      'user.id',
      'user.name',
      'user.email',
      'user.cpf',
      'user.updated_at',
    ]);

    queryBuilder.skip((page! - 1) * limit!).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async create(user: UserDto): Promise<{ message: string }> {
    try {
      const timestamp = { created_at: new Date(), updated_at: new Date() };

      user.id = uuidv4();

      const password = bcrypt.hashSync(
        user.cpf.substring(0, 6),
        bcrypt.genSaltSync(Math.floor(Math.random() * 20)),
      );

      user.password = password;

      const existingProfiles = await this.profileRepository.findByIds(
        user.profiles,
      );

      const newUser = this.userRepository.create({
        ...user,
        ...timestamp,
        profiles: existingProfiles,
      });

      await this.userRepository.save(newUser);

      return { message: 'Usuário criado com sucesso' };
    } catch (error: any) {
      if (error.number === 2627) {
        throw new ConflictException(
          'Não é possível criar um usuário com o mesmo CPF ou e-mail',
        );
      }
      throw error;
    }
  }

  async findByEmail(email: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['profiles'],
    });

    return user;
  }

  async findOne(id: string): Promise<any> {
    //1. Buscar o usuário
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profiles'],
    });
    if (!user) {
      throw new NotFoundException('Não foi possível encontrar o usuário');
    }

    return {
      ...instanceToPlain(user),
    };
  }

  async delete(id: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Não foi possível encontrar o usuário');
    }
    await this.userRepository.delete(id);

    return { message: 'Usuário removido com sucesso' };
  }

  async update(id: string, user: UpdateUserDto): Promise<{ message: string }> {
    const userExists = await this.userRepository.findOne({ where: { id } });
    if (!userExists) {
      throw new NotFoundException('Não foi possível encontrar o usuário');
    }

    const profiles = await this.profileRepository.findByIds(user.roles);

    if (!profiles) {
      throw new NotFoundException('Perfil não encontrado');
    }

    const timestamp = { updated_at: new Date() };

    if (user.email) userExists.email = user.email;
    if (user.name) userExists.name = user.name;

    await this.userRepository.save({ ...userExists, ...timestamp });

    await this.profilesService.updateProfilesToUser(id, user.roles);

    return { message: 'Usuário atualizado com sucesso' };
  }
}
