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
import { UuidParamDto } from './dtos/uuid-param.dto';
import { User } from './users.entity';
import { PaginationDto } from '../users/dtos/pagination.dto';
import { PaginationResponseDto } from '../users/dtos/pagination-response.dto';
import type { UserById } from './interfaces/User';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: UserDto): Promise<{ message: string }> {
    return this.userService.create(user);
  }

  @Get('paginate')
  async paginate(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<User>> {
    return this.userService.paginate(paginationDto);
  }

  @Get('me')
  async me(@Request() req: any): Promise<User> {
    return this.userService.findOne(req.user.sub);
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param() params: UuidParamDto): Promise<UserById> {
    return this.userService.findOne(params.id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param() params: UuidParamDto,
    @Body() user: UpdateUserDto,
  ): Promise<{ message: string }> {
    return this.userService.update(params.id, user);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Param() params: UuidParamDto): Promise<{ message: string }> {
    return this.userService.delete(params.id);
  }
}
