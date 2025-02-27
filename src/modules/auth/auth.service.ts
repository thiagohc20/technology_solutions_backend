import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto } from '../auth/dtos/auth.dto';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from 'src/modules/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface GenerateTokensOptions {
  accessTokenExp?: number;
  refreshTokenExp?: number;
}

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    )!;
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user || !compareSync(password, user.password)) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return this.generateTokens(user);
  }

  private generateTokens(user: any, options?: GenerateTokensOptions) {
    const payload = {
      sub: user.id,
      email: user.email,
      profiles: user.profiles,
    };
    const refreshTokenSecret =
      this.configService.get<string>('JWT_REFRESH_SECRET');
    const accessTokenExpiresIn = this.jwtExpirationTimeInSeconds;
    const refreshTokenExpiresIn = this.configService.get<number>(
      'JWT_REFRESH_EXPIRATION_TIME',
    );

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: refreshTokenSecret,
        expiresIn: refreshTokenExpiresIn,
      }),
      expiresIn: accessTokenExpiresIn,
    };
  }

  async refreshToken(refreshToken: string) {
    let refreshPayload: any;
    try {
      refreshPayload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch (refreshError) {
      throw new UnauthorizedException('Refresh Token inválido');
    }

    const payload = {
      sub: refreshPayload.sub,
      email: refreshPayload.email,
      profiles: refreshPayload.profiles,
    };

    const newAccessToken = this.jwtService.sign(payload);

    return newAccessToken;
  }
}
