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

  @Get('length')
  async getUsersLength() {
    return this.userService.getUsersLength();
  }
}
