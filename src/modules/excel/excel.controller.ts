import { Controller, Get, Res, UseGuards, Query } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { Response } from 'express';
import { AuthGuard } from '../auth/auth.guard';

@Controller('excel')
@UseGuards(AuthGuard)
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Get('export')
  exportExcel(@Query('search') search: string, @Res() res: Response) {
    console.log(search);
    return this.excelService.generateExcel(res, search);
  }
}
