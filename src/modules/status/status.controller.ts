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
import { StatusService } from './status.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  // Buscar todos os employees
  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.statusService.findAll();
  }
}
