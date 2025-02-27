import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (ConfigService: ConfigService) => ({
        type: 'mssql',
        host: ConfigService.get<string>('DB_HOST'),
        port: +ConfigService.get<number>('DB_PORT')!,
        username: ConfigService.get<string>('DB_USER'),
        password: ConfigService.get<string>('DB_PASSWORD'),
        database: ConfigService.get<string>('DB_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        synchronize: false,
        options: {
          trustServerCertificate: true,
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
