import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertProfiles1740751751683 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO profiles (name, created_at) values ('Administrador', GETDATE())
            INSERT INTO profiles (name, created_at) values ('Gente e Cultura', GETDATE())
            INSERT INTO profiles (name, created_at) values ('Colaborador Comum', GETDATE())
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE profiles`);
  }
}
