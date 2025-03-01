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

  @Post()
  create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<{ message: string }> {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(): Promise<EmployeeEntity[]> {
    return this.employeesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: number): Promise<EmployeeEntity | null> {
    return this.employeesService.findOne(id);
  }

  // @Put(':id')
  // update(
  //   @Param('id') id: number,
  //   @Body() updateEmployeeDto: UpdateEmployeeDto,
  // ): Promise<EmployeeEntity | null> {
  //   return this.employeesService.update(id, updateEmployeeDto);
  // }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number): Promise<void> {
    return this.employeesService.remove(id);
  }
}
