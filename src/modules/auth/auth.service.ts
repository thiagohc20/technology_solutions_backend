import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto } from '../auth/dtos/auth.dto';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from 'src/modules/users/users.service';
import { EmployeesService } from '../employees/employees.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { EmployeeEntity } from '../employees/entity/employee.entity';
interface GenerateTokensOptions {
  accessTokenExp?: number;
  refreshTokenExp?: number;
}

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: string;
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly employeeService: EmployeesService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(
    cpf: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string; expiresIn: string }> {
    const employee = await this.employeeService.findOneByCpf(cpf);

    if (!employee || !employee?.user) {
      throw new UnauthorizedException('Você não tem acesso a aplicação');
    }

    const user = await this.userService.getUser(employee?.userId);

    if (!employee || !bcrypt.compareSync(password, user?.password!)) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const token = this.generateTokens(employee);

    return token;
  }

  private generateTokens(
    user: EmployeeEntity,
    options?: GenerateTokensOptions,
  ) {
    const payload = {
      sub: user.user.id,
      email: user.email,
      profile: user.user.profile,
    };
    const refreshTokenSecret =
      this.configService.get<string>('JWT_REFRESH_SECRET');
    const accessTokenExpiresIn = this.jwtExpirationTimeInSeconds;
    const refreshTokenExpiresIn = this.configService.get<string>(
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
      profile: refreshPayload.profile,
    };

    const newAccessToken = this.jwtService.sign(payload);

    return newAccessToken;
  }
}
