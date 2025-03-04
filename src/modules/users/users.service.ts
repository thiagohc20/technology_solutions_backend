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
import { ProfileChooseService } from '../profile_choose/profile_choose.service';

@Injectable()
export class UserService {
  constructor(
    private readonly profileChooseService: ProfileChooseService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
    @InjectRepository(ProfileEntity)
    private profilesRepository: Repository<ProfileEntity>,
  ) {}

  async create(user: CreateUserDto): Promise<{ message: string; id: number }> {
    const hasEmployee = await this.employeeRepository.findOne({
      where: { id: user.employeeId },
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

    const userCreated = await this.userRepository.save(newUser);

    return { message: 'Usuário criado com sucesso!', id: userCreated.id };
  }

  async getUser(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async getUsersLength(): Promise<any> {
    const manager = 3;
    const pd = 5;
    const employeeNormal = 6;

    const length = {
      manager,
      pd,
      employeeNormal,
    };

    return length;
  }

  async update(
    id: number,
    user: ProfileEntity,
    employee: UpdateUserDto,
  ): Promise<{ message: string }> {
    const canChangeProfile = await this.profileChooseService.canChangeProfile(
      user,
      employee.profileId,
    );

    if (!canChangeProfile) {
      throw new HttpException(
        'O usuário atual não tem permissão para alterar para esse perfil',
        500,
      );
    }

    const password = bcrypt.hashSync(
      employee.password,
      bcrypt.genSaltSync(Math.floor(Math.random() * 20)),
    );

    employee.password = password;

    const hasEmployee = await this.employeeRepository.findOne({
      where: { id: employee.employeeId },
    });

    if (!hasEmployee) {
      throw new HttpException('Colaborador não encontrado', 500);
    }

    const existingProfile = await this.profilesRepository.findOne({
      where: { id: employee.profileId },
    });

    if (!existingProfile) {
      throw new HttpException('Perfil não encontrado', 500);
    }

    let newUser;
    if (employee.profileId != 3) {
      newUser = this.userRepository.create({
        employee: hasEmployee,
        password: employee.password,
        updated_at: new Date(),
        profile: existingProfile,
      });
    } else {
      newUser = this.userRepository.create({
        employee: hasEmployee,
        updated_at: new Date(),
        profile: existingProfile,
      });
    }

    await this.userRepository.update(id, newUser);

    return { message: 'Usuário atualizado com sucesso!' };
  }
}
