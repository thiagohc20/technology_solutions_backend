import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions, DataSource } from 'typeorm';

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: 'mssql',
  host: configService.get<string>('DB_HOST'),
  port: +configService.get<number>('DB_PORT')!,
  username: configService.get<string>('DB_USER')!,
  password: configService.get<string>('DB_PASSWORD')!,
  database: configService.get<string>('DB_NAME')!,
  entities: [],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  extra: {
    trustServerCertificate: true,
  },
};

export default new DataSource(dataSourceOptions);
