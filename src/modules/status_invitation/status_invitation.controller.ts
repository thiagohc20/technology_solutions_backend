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
import { StatusInvitationService } from './status_invitation.service';
import { AuthGuard } from '../auth/auth.guard';
import { Equals } from 'class-validator';

@Controller('status_invitation')
export class StatusInvitationController {
  constructor(
    private readonly statusInvitationService: StatusInvitationService,
  ) {}

  // Buscar todos os employees
  @Get()
  // @UseGuards(AuthGuard)
  findAll() {
    return this.statusInvitationService.findAll();
  }

  @Get('update')
  // @UseGuards(AuthGuard)
  findAllOverdue() {
    return this.statusInvitationService.updateExpiredStatus();
  }
}
