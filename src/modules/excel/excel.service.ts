import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { EmployeeEntity } from '../employees/entity/employee.entity';

@Injectable()
export class ExcelService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeesRepository: Repository<EmployeeEntity>,
  ) {}
  // Função para gerar o arquivo Excel
  async generateExcel(res: Response, search: string) {
    const employees = await this.employeesRepository.find();

    const employeesFiltered = employees.filter(
      (item) =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        item.cpf.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        item.email.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        search == undefined ||
        search == '',
    );

    // Converte os dados em uma planilha
    const ws = XLSX.utils.json_to_sheet(employeesFiltered);

    // Cria um novo arquivo de Excel (workbook)
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Planilha1');

    // Gera o arquivo Excel em formato binário
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

    // Define os cabeçalhos para download do arquivo Excel
    res.setHeader('Content-Disposition', 'attachment; filename=arquivo.xlsx');
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(excelBuffer);
  }
}
