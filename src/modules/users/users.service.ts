import {
  Injectable,
  NotFoundException,
  ConflictException,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
/* entities */
import { UserEntity } from './users.entity';
import { ProfileEntity } from '../profiles/entity/profile.entity';
import { EmployeeEntity } from './../employees/entity/employee.entity';
/* services */
import { ProfilesService } from '../profiles/profiles.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
    @InjectRepository(ProfileEntity)
    private profilesRepository: Repository<ProfileEntity>,
  ) {}

  async create(user: CreateUserDto): Promise<{ message: string }> {
    const hasEmployee = await this.employeeRepository.findOne({
      where: { id: user.userId },
    });

    if (!hasEmployee) {
      throw new HttpException('Colaborador não encontrado', 500);
    }

    const hasProfile = await this.profilesRepository.findOne({
      where: { id: user.profileId },
    });

    if (!hasProfile) {
      throw new HttpException('Perfil não encontrado', 500);
    }

    const newUser = this.userRepository.create({
      employee: hasEmployee,
      created_at: new Date(),
      profile: hasProfile,
    });

    await this.userRepository.save(newUser);

    return { message: 'Usuário criado com sucesso!' };
  }

  async update(user: UpdateUserDto): Promise<{ message: string }> {
    const password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(Math.floor(Math.random() * 20)),
    );

    user.password = password;

    const hasEmployee = await this.employeeRepository.findOne({
      where: { id: user.userId },
    });

    if (!hasEmployee) {
      throw new HttpException('Colaborador não encontrado', 500);
    }

    const existingProfile = await this.profilesRepository.findOne({
      where: { id: user.profileId },
    });

    if (!existingProfile) {
      throw new HttpException('Perfil não encontrado', 500);
    }

    const newUser = this.userRepository.create({
      employee: hasEmployee,
      created_at: new Date(),
      profile: existingProfile,
    });

    await this.userRepository.save(newUser);

    return { message: 'Usuário atualizado com sucesso!' };
  }
}
