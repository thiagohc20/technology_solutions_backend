import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthServiceTsController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from 'src/modules/users/users.module';
import { Profile } from 'src/modules/profiles/entity/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Profile]),
    UserModule,
  ],
  providers: [AuthService],
  controllers: [AuthServiceTsController],
})
export class AuthModule {}
