import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { User } from '../users/users.entity';
import { Profile } from '../profiles/entity/profile.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtAccessSecret: string;
  private jwtRefreshSecret: string;

  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {
    this.jwtAccessSecret = this.configService.get<string>('JWT_ACCESS_SECRET')!;
    this.jwtRefreshSecret =
      this.configService.get<string>('JWT_REFRESH_SECRET')!;
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Token não encontrado');
    }

    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtAccessSecret,
      });
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }

    //Verifica se o token está expirado

    try {
    } catch (error: any) {
      // Token de acesso expirado ou inválido
      if (error.name === 'TokenExpiredError') {
        // pega o refresh token do cookie
        const refreshToken = this.extractRefreshToken(request);

        if (!refreshToken) {
          throw new UnauthorizedException('Refresh Token não encontrado');
        }

        console.log('refreshToken', refreshToken);

        try {
          const refreshPayload = await this.jwtService.verifyAsync(
            refreshToken,
            {
              secret: this.jwtRefreshSecret,
            },
          );
          // Gerar um novo access token com o refresh token válido
          const newAccessToken = this.jwtService.sign(
            { userId: refreshPayload.userId, expiresIn: '432000' },
            { secret: this.jwtAccessSecret },
          );

          request.headers.authorization = `Bearer ${newAccessToken}`;
          payload = refreshPayload;
        } catch (refreshError) {
          throw new UnauthorizedException('Refresh Token inválido');
        }
      } else {
        throw new UnauthorizedException('Token inválido');
      }
    }

    request.user = payload;
    const user: User = request.user;

    const requiredPermissions = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredPermissions) {
      return true;
    }

    // const userProfileId = user.profiles.map((profile) => profile.id);

    // const profiles = await this.profileRepository.find({
    //   where: { id: In(userProfileId) },
    //   relations: ['users'],
    // });

    // const userProfile = profiles.map((profile) => profile);

    // if (
    //   !user ||
    //   !userProfile.some(({ id }) => requiredPermissions.includes(id))
    // ) {
    //   throw new ForbiddenException('Acesso negado');
    // }

    return true;
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractRefreshToken(request: Request): string | undefined {
    const refreshToken = request.headers.cookie?.split('=')[1] as string;
    return refreshToken;
  }
}
