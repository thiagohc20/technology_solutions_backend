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
import { UserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './users.entity';
import { PaginationDto } from '../users/dtos/pagination.dto';
import { PaginationResponseDto } from '../users/dtos/pagination-response.dto';
import type { UserById } from './interfaces/User';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
// @UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: UserDto): Promise<{ message: string }> {
    return this.userService.create(user);
  }

  @Get('findAll')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // @Get('me')
  // async me(@Request() req: any): Promise<User> {
  //   return this.userService.findOne(req.user.sub);
  // }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param('id') id: string): Promise<UserById> {
    return this.userService.findOne(Number(id));
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<{ message: string }> {
    return this.userService.update(Number(id), user);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.userService.delete(Number(id));
  }
}
