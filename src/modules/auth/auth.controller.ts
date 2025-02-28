import { Controller, Res, Post, Body, HttpCode } from '@nestjs/common';
import { AuthResponseDto, AuthDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthServiceTsController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async signIn(
    @Body() auth: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const authReturn = await this.authService.signIn(auth.cpf, auth.password);
    res.cookie('refresh_token', authReturn.refreshToken);
    return { token: authReturn.accessToken, expiresIn: authReturn.expiresIn };
  }

  @Post('refreshToken')
  async refreshToken(@Body() { refreshToken }: { refreshToken: string }) {
    return this.authService.refreshToken(refreshToken);
  }
}
