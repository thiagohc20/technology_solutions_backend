import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeEntity } from './entity/employee.entity';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { UserService } from '../users/users.service';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class EmployeesService {
  constructor(
    private readonly usersService: UserService,
    @InjectRepository(EmployeeEntity)
    private employeesRepository: Repository<EmployeeEntity>,
  ) {}

  // Criar um novo employee
  async create(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<{ message: string }> {
    const hasEmployeeCPF = await this.employeesRepository.findOne({
      where: { cpf: createEmployeeDto.cpf },
    });

    const hasEmployeeEmail = await this.employeesRepository.findOne({
      where: { email: createEmployeeDto.email },
    });

    if (hasEmployeeCPF || hasEmployeeEmail) {
      throw new HttpException('CPF ou Email já esteja registrado', 500);
    }

    // Tenta criar o funcionário com a data atual
    const employee = this.employeesRepository.create({
      ...createEmployeeDto,
      created_at: new Date(), // Adicionando a data e hora atual manualmente
    });

    // Tenta salvar o novo funcionário
    const user = await this.employeesRepository.save(employee);

    // Criar o usuário do colaborador
    const data = {
      employeeId: user.id,
      profileId: 3,
    };

    user.userId = (await this.usersService.create(data)).id;

    await this.employeesRepository.update(user.id, { userId: user.userId });

    return { message: 'Colaborador cadastrado com sucesso' };
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
