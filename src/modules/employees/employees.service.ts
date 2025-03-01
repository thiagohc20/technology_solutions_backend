import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeEntity } from './entity/employee.entity';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { UserService } from '../users/users.service';
import { StatusInvitationService } from '../status_invitation/status_invitation.service';
import { instanceToPlain } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EmployeesService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly statusInvitationService: StatusInvitationService,
    @InjectRepository(EmployeeEntity)
    private employeesRepository: Repository<EmployeeEntity>,
  ) {}

  async create(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<{ message: string }> {
    const decode = await this.decodedToken(createEmployeeDto.token);

    const hasStatusInvitation =
      await this.statusInvitationService.findOneByEmail(decode.email);

    if (!hasStatusInvitation) {
      throw new HttpException('Convite não encontrado', 500);
    }

    if (hasStatusInvitation?.statusId == 1) {
      throw new HttpException('Usuário ja cadastrado', 500);
    }

    if (hasStatusInvitation?.statusId == 3) {
      throw new HttpException('Convite expirado', 500);
    }

    if (decode.email != createEmployeeDto.email) {
      throw new HttpException('Email divergente', 404);
    }

    const hasEmployeeCPF = await this.employeesRepository.findOne({
      where: { cpf: createEmployeeDto.cpf },
    });

    const hasEmployeeEmail = await this.employeesRepository.findOne({
      where: { email: createEmployeeDto.email },
    });

    if (hasEmployeeCPF || hasEmployeeEmail) {
      throw new HttpException('CPF ou Email já esteja registrado', 500);
    }

    const employee = this.employeesRepository.create({
      ...createEmployeeDto,
      created_at: new Date(),
    });

    const user = await this.employeesRepository.save(employee);

    const data = {
      employeeId: user.id,
      profileId: 3,
    };

    user.userId = (await this.usersService.create(data)).id;

    await this.employeesRepository.update(user.id, { userId: user.userId });

    await this.statusInvitationService.finishingInvite(decode.email);

    return { message: 'Colaborador cadastrado com sucesso' };
  }

  private async decodedToken(
    token: string,
  ): Promise<{ email: string; iat: number; exp: number }> {
    return await this.jwtService
      .verifyAsync(token, { secret: process.env.EMAIL_SECRET })
      .then((data) => data)
      .catch(() => {
        throw new UnauthorizedException('Tempo para resetar a senha expirado!');
      });
  }

  // Buscar todos os employees
  async findAll(): Promise<any> {
    const employees = await this.employeesRepository.find();
    return instanceToPlain(employees);
  }

  // Buscar um employee por ID
  async findOne(id: number): Promise<any | null> {
    const employee = await this.employeesRepository.findOne({
      where: { id: id },
      relations: ['user.profile'],
    });
    if (!employee) {
      throw new HttpException('Colaborador não encontrado', 404);
    }

    const {
      user: { password, ...userWithoutPassword },
      ...objWithoutPassword
    } = employee;

    const newObj = {
      ...objWithoutPassword,
      user: {
        ...userWithoutPassword,
      },
    };

    return newObj as any;
  }

  // Buscar um employee por CPF
  async findOneByCpf(cpf: string): Promise<EmployeeEntity | null> {
    const employee = await this.employeesRepository.findOne({
      where: { cpf: cpf },
      relations: ['user.profile'],
    });
    if (!employee) {
      throw new HttpException('Colaborador não encontrado', 404);
    }

    return employee;
  }

  // Atualizar um employee
  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<EmployeeEntity | null> {
    await this.employeesRepository.update(id, updateEmployeeDto);
    return this.findOne(id);
  }

  // Deletar um employee
  async remove(id: number): Promise<void> {
    await this.employeesRepository.delete(id);
  }
}
