import {
  Injectable,
  NotFoundException,
  ConflictException,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError, In } from 'typeorm';
import { UserDto } from './dtos/create-user.dto';
import { PasswordTransferDto } from './dtos/password-transfer.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt';
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
import { classToPlain } from 'class-transformer';

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

  async findAll(): Promise<any> {
    const users = await this.userRepository.find();
    return instanceToPlain(users);
  }

  async create(user: UserDto): Promise<{ message: string }> {
    try {
      const hasUserCpf = await this.userRepository.findOne({
        where: {
          cpf: user.cpf,
        },
      });

      if (hasUserCpf) {
        throw new ConflictException(
          'Não é possível criar um usuário com o mesmo CPF',
        );
      }

      const hasUserEmail = await this.userRepository.findOne({
        where: {
          email: user.email,
        },
      });

      if (hasUserEmail) {
        throw new ConflictException(
          'Não é possível criar um usuário com o mesmo e-mail',
        );
      }

      // const timestamp = { created_at: new Date(), updated_at: new Date() };

      if (user.password) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
      }

      const existingProfile = await this.profileRepository.findOne({
        where: { id: 3 },
      });

      const newUser = this.userRepository.create({
        ...user,
        profile: existingProfile!,
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

  async findByCpf(cpf: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { cpf },
      relations: ['profiles'],
    });

    return user;
  }

  async findOne(id: number): Promise<any> {
    //1. Buscar o usuário
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!user) {
      throw new NotFoundException('Não foi possível encontrar o usuário');
    }

    return {
      ...instanceToPlain(user),
    };
  }

  async delete(id: number): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Não foi possível encontrar o usuário');
    }
    await this.userRepository.delete(id);

    return { message: 'Usuário removido com sucesso' };
  }

  async update(id: number, user: UpdateUserDto): Promise<{ message: string }> {
    const userExists = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!userExists) {
      throw new NotFoundException('Não foi possível encontrar o usuário');
    }

    // // const timestamp = { updated_at: new Date() };

    if (user.email) userExists.email = user.email;
    if (user.name) userExists.name = user.name;

    await this.userRepository.save({ ...userExists });

    await this.profilesService.updateProfilesToUser(id, user.role);

    return { message: 'Usuário atualizado com sucesso' };
  }
}
