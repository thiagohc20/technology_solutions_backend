import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  UsePipes,
  Request,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './users.entity';
import { PaginationDto } from '../users/dtos/pagination.dto';
import { PaginationResponseDto } from '../users/dtos/pagination-response.dto';
import type { UserById } from './interfaces/User';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() employee: UpdateUserDto,
    @Request() req,
  ): Promise<{ message: string }> {
    return this.userService.update(Number(id), req.user.profile, employee);
  }
}
