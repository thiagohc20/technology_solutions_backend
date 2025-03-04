import { EmployeesService } from './../employees/employees.service';
import {
  Controller,
  Res,
  Post,
  Request,
  Body,
  HttpCode,
  Get,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthResponseDto, AuthDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from '../auth/auth.guard';

@Controller('auth')
export class AuthServiceTsController {
  constructor(
    private readonly authService: AuthService,
    private readonly employeeService: EmployeesService,
  ) {}

  @HttpCode(200)
  @Post('login')
  async signIn(
    @Body() auth: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const authReturn = await this.authService.signIn(auth.cpf, auth.password);
    res.cookie('refresh_token', authReturn.refreshToken);
    return {
      token: authReturn.accessToken,
      expiresIn: authReturn.expiresIn,
      refreshToken: authReturn.refreshToken,
    };
  }

  @Post('refreshToken')
  async refreshToken(@Body() { refreshToken }: { refreshToken: string }) {
    return this.authService.refreshToken(refreshToken);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Request() req): Promise<string> {
    return this.employeeService.findOne(req.user.id);
  }
}
