import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  CanActivate,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { EmployeeEntity } from './entity/employee.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  // Criar um novo employee
  @Post()
  create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<{ message: string }> {
    return this.employeesService.create(createEmployeeDto);
  }

  // Buscar todos os employees
  @Get()
  @UseGuards(AuthGuard)
  findAll(): Promise<EmployeeEntity[]> {
    return this.employeesService.findAll();
  }

  // Buscar um employee por ID
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: number): Promise<EmployeeEntity | null> {
    return this.employeesService.findOne(id);
  }

  //Atualizar um employee
  @Put(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<EmployeeEntity | null> {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  // Deletar um employee
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number): Promise<void> {
    return this.employeesService.remove(id);
  }
}
