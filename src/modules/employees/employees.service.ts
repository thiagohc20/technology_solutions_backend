import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeEntity } from './entity/employee.entity';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { UserService } from '../users/users.service';

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

    const data = {
      userId: user.id,
      profileId: 3,
    };

    // Criar o usuário do colaborador
    await this.usersService.create(data);

    return { message: 'Colaborador cadastrado com sucesso' };
  }

  // Buscar todos os employees
  async findAll(): Promise<EmployeeEntity[]> {
    return await this.employeesRepository.find();
  }

  // Buscar um employee por ID
  async findOne(id: number): Promise<EmployeeEntity | null> {
    return await this.employeesRepository.findOne({ where: { id: id } });
  }

  // Buscar um employee por CPF
  async findOneByCpf(cpf: string): Promise<EmployeeEntity | null> {
    return await this.employeesRepository.findOne({ where: { cpf: cpf } });
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
